<?php
/**
 * Plugin Name: Single Review Blog Meta Fields
 * Description: Adds custom meta fields and REST API support for the single review blog template.
 * Author: DistributingCare
 * Version: 1.0.1
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Meta Fields for REST API
 */
add_action('rest_api_init', 'register_review_meta_fields');
function register_review_meta_fields() {
    // Expose 'review_products' array by retrieving individual meta fields
    register_rest_field('post', 'review_products', array(
        'get_callback' => function($post_arr) {
            $post_id = $post_arr['id'];
            $count = (int) get_post_meta($post_id, '_review_products_count', true);
            $products = array();
            
            for ($i = 0; $i < $count; $i++) {
                $product = array(
                    'name' => get_post_meta($post_id, '_review_product_' . $i . '_name', true),
                    'key_feature' => get_post_meta($post_id, '_review_product_' . $i . '_key_feature', true),
                    'price_range' => get_post_meta($post_id, '_review_product_' . $i . '_price_range', true),
                    'rating' => (float) get_post_meta($post_id, '_review_product_' . $i . '_rating', true),
                    'image_url' => get_post_meta($post_id, '_review_product_' . $i . '_image_url', true),
                    'image_alt' => get_post_meta($post_id, '_review_product_' . $i . '_image_alt', true),
                    'description' => get_post_meta($post_id, '_review_product_' . $i . '_description', true),
                    'pros' => array_values(array_filter(array_map('trim', explode('|', get_post_meta($post_id, '_review_product_' . $i . '_pros', true))))),
                    'cons' => array_values(array_filter(array_map('trim', explode('|', get_post_meta($post_id, '_review_product_' . $i . '_cons', true))))),
                    'affiliate_link' => get_post_meta($post_id, '_review_product_' . $i . '_affiliate_link', true),
                );
                $products[] = $product;
            }
            return $products;
        },
        'schema' => null,
    ));

    // Expose 'editor_team'
    register_rest_field('post', 'editor_team', array(
        'get_callback' => function($post_arr) {
            $data = get_post_meta($post_arr['id'], '_editor_team', true);
            return $data ? $data : 'Health Editorial Team';
        }
    ));

    // Expose 'read_time'
    register_rest_field('post', 'read_time', array(
        'get_callback' => function($post_arr) {
            $data = get_post_meta($post_arr['id'], '_read_time', true);
            return $data ? $data : '10 min read';
        }
    ));
}

/**
 * Add a dynamic Meta Box for manual entry
 */
add_action('add_meta_boxes', 'add_review_meta_boxes');
function add_review_meta_boxes() {
    add_meta_box('review_products_box', 'Review Template Settings', 'render_review_meta_box', 'post', 'normal', 'high');
}

function render_review_meta_box($post) {
    wp_nonce_field('review_meta_box_nonce', 'meta_box_nonce');
    
    $editor_team = get_post_meta($post->ID, '_editor_team', true);
    $read_time = get_post_meta($post->ID, '_read_time', true);
    $count = (int) get_post_meta($post->ID, '_review_products_count', true);
    
    ?>
    <style>
        .review-product-item { border: 1px solid #ccd0d4; padding: 15px; margin-bottom: 15px; background: #fafafa; position: relative; }
        .review-product-item h4 { margin-top: 0; font-size: 1.1em; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
        .review-product-item label { display: block; font-weight: bold; margin-bottom: 5px; }
        .review-product-item input[type="text"], .review-product-item textarea, .review-product-item input[type="number"] { width: 100%; margin-bottom: 15px; }
        .remove-product { color: #b32d2e; text-decoration: none; font-weight: normal; font-size: 0.9em; }
        .remove-product:hover { color: #f00; }
    </style>
    <p>
        <label for="editor_team"><strong>Editor Team Name</strong></label><br>
        <input type="text" name="editor_team" id="editor_team" value="<?php echo esc_attr($editor_team); ?>" class="regular-text" placeholder="e.g. Health Editorial Team">
    </p>
    <p>
        <label for="read_time"><strong>Read Time</strong></label><br>
        <input type="text" name="read_time" id="read_time" value="<?php echo esc_attr($read_time); ?>" class="regular-text" placeholder="e.g. 12 min read">
    </p>
    <hr>
    <h3>Review Products</h3>
    <div id="review-products-container">
        <?php
        for ($i = 0; $i < $count; $i++) {
            $name = get_post_meta($post->ID, '_review_product_' . $i . '_name', true);
            $key_feature = get_post_meta($post->ID, '_review_product_' . $i . '_key_feature', true);
            $price_range = get_post_meta($post->ID, '_review_product_' . $i . '_price_range', true);
            $rating = get_post_meta($post->ID, '_review_product_' . $i . '_rating', true);
            $image_url = get_post_meta($post->ID, '_review_product_' . $i . '_image_url', true);
            $image_alt = get_post_meta($post->ID, '_review_product_' . $i . '_image_alt', true);
            $description = get_post_meta($post->ID, '_review_product_' . $i . '_description', true);
            $pros = get_post_meta($post->ID, '_review_product_' . $i . '_pros', true);
            $cons = get_post_meta($post->ID, '_review_product_' . $i . '_cons', true);
            $affiliate_link = get_post_meta($post->ID, '_review_product_' . $i . '_affiliate_link', true);
            
            render_product_fields($i, $name, $key_feature, $price_range, $rating, $image_url, $image_alt, $description, $pros, $cons, $affiliate_link);
        }
        ?>
    </div>
    <p><button type="button" class="button" id="add-review-product">Add Product</button></p>
    <input type="hidden" name="review_products_count" id="review_products_count" value="<?php echo $count; ?>">
    
    <script>
        jQuery(document).ready(function($) {
            var productCount = <?php echo max(0, $count); ?>;
            var container = $('#review-products-container');
            var countInput = $('#review_products_count');

            $('#add-review-product').on('click', function() {
                var html = `
                    <div class="review-product-item" data-index="${productCount}">
                        <h4>Product ${productCount + 1} <a href="#" class="remove-product" style="float:right;">Remove</a></h4>
                        <label>Name</label><input type="text" name="product_${productCount}_name" value="">
                        <label>Key Feature</label><input type="text" name="product_${productCount}_key_feature" value="" placeholder="e.g. Ultra-lightweight (12 lbs)">
                        <label>Price Range</label><input type="text" name="product_${productCount}_price_range" value="" placeholder="e.g. $$">
                        <label>Rating (e.g. 4.5)</label><input type="number" step="0.1" max="5" min="0" name="product_${productCount}_rating" value="">
                        <label>Image URL</label><input type="text" name="product_${productCount}_image_url" value="">
                        <label>Image Alt Text</label><input type="text" name="product_${productCount}_image_alt" value="">
                        <label>Description</label><textarea name="product_${productCount}_description" rows="3"></textarea>
                        <label>Pros (separate with | pipe character)</label><input type="text" name="product_${productCount}_pros" value="" placeholder="Pro 1 | Pro 2">
                        <label>Cons (separate with | pipe character)</label><input type="text" name="product_${productCount}_cons" value="" placeholder="Con 1 | Con 2">
                        <label>Affiliate Link URL</label><input type="text" name="product_${productCount}_affiliate_link" value="">
                    </div>
                `;
                container.append(html);
                productCount++;
                countInput.val(productCount);
            });

            container.on('click', '.remove-product', function(e) {
                e.preventDefault();
                if(confirm("Are you sure you want to remove this product row? Note: Changes are not saved until you hit Update on the post.")) {
                    $(this).closest('.review-product-item').remove();
                }
            });
        });
    </script>
    <?php
}

function render_product_fields($index, $name, $key_feature, $price_range, $rating, $image_url, $image_alt, $description, $pros, $cons, $affiliate_link) {
    ?>
    <div class="review-product-item" data-index="<?php echo $index; ?>">
        <h4>Product <?php echo $index + 1; ?> <a href="#" class="remove-product" style="float:right;">Remove</a></h4>
        <label>Name</label><input type="text" name="product_<?php echo $index; ?>_name" value="<?php echo esc_attr($name); ?>">
        <label>Key Feature</label><input type="text" name="product_<?php echo $index; ?>_key_feature" value="<?php echo esc_attr($key_feature); ?>">
        <label>Price Range</label><input type="text" name="product_<?php echo $index; ?>_price_range" value="<?php echo esc_attr($price_range); ?>">
        <label>Rating (e.g. 4.5)</label><input type="number" step="0.1" max="5" min="0" name="product_<?php echo $index; ?>_rating" value="<?php echo esc_attr($rating); ?>">
        <label>Image URL</label><input type="text" name="product_<?php echo $index; ?>_image_url" value="<?php echo esc_attr($image_url); ?>">
        <label>Image Alt Text</label><input type="text" name="product_<?php echo $index; ?>_image_alt" value="<?php echo esc_attr($image_alt); ?>">
        <label>Description</label><textarea name="product_<?php echo $index; ?>_description" rows="3"><?php echo esc_textarea($description); ?></textarea>
        <label>Pros (separate with | pipe character)</label><input type="text" name="product_<?php echo $index; ?>_pros" value="<?php echo esc_attr($pros); ?>" placeholder="Pro 1 | Pro 2">
        <label>Cons (separate with | pipe character)</label><input type="text" name="product_<?php echo $index; ?>_cons" value="<?php echo esc_attr($cons); ?>" placeholder="Con 1 | Con 2">
        <label>Affiliate Link URL</label><input type="text" name="product_<?php echo $index; ?>_affiliate_link" value="<?php echo esc_attr($affiliate_link); ?>">
    </div>
    <?php
}

add_action('save_post', 'save_review_meta_box');
function save_review_meta_box($post_id) {
    if (!isset($_POST['meta_box_nonce']) || !wp_verify_nonce($_POST['meta_box_nonce'], 'review_meta_box_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    
    if (isset($_POST['editor_team'])) {
        update_post_meta($post_id, '_editor_team', sanitize_text_field($_POST['editor_team']));
    }
    if (isset($_POST['read_time'])) {
        update_post_meta($post_id, '_read_time', sanitize_text_field($_POST['read_time']));
    }
    
    if (isset($_POST['review_products_count'])) {
        $submitted_count = (int) $_POST['review_products_count'];
        $actual_count = 0;
        
        // Clean up old ones just in case
        $old_count = (int) get_post_meta($post_id, '_review_products_count', true);
        for ($i = 0; $i < max($old_count, $submitted_count); $i++) {
            delete_post_meta($post_id, '_review_product_' . $i . '_name');
            delete_post_meta($post_id, '_review_product_' . $i . '_key_feature');
            delete_post_meta($post_id, '_review_product_' . $i . '_price_range');
            delete_post_meta($post_id, '_review_product_' . $i . '_rating');
            delete_post_meta($post_id, '_review_product_' . $i . '_image_url');
            delete_post_meta($post_id, '_review_product_' . $i . '_image_alt');
            delete_post_meta($post_id, '_review_product_' . $i . '_description');
            delete_post_meta($post_id, '_review_product_' . $i . '_pros');
            delete_post_meta($post_id, '_review_product_' . $i . '_cons');
            delete_post_meta($post_id, '_review_product_' . $i . '_affiliate_link');
        }

        // Save new ones and re-index
        for ($i = 0; $i < $submitted_count; $i++) {
            if (isset($_POST['product_' . $i . '_name'])) {
                // If the dynamic Row was removed, 'product_X_name' wouldn't exist in $_POST.
                // This correctly condenses everything back down to 0, 1, 2...
                update_post_meta($post_id, '_review_product_' . $actual_count . '_name', sanitize_text_field($_POST['product_' . $i . '_name']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_key_feature', sanitize_text_field($_POST['product_' . $i . '_key_feature']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_price_range', sanitize_text_field($_POST['product_' . $i . '_price_range']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_rating', sanitize_text_field($_POST['product_' . $i . '_rating']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_image_url', esc_url_raw($_POST['product_' . $i . '_image_url']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_image_alt', sanitize_text_field($_POST['product_' . $i . '_image_alt']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_description', sanitize_textarea_field($_POST['product_' . $i . '_description']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_pros', sanitize_text_field($_POST['product_' . $i . '_pros']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_cons', sanitize_text_field($_POST['product_' . $i . '_cons']));
                update_post_meta($post_id, '_review_product_' . $actual_count . '_affiliate_link', esc_url_raw($_POST['product_' . $i . '_affiliate_link']));
                
                $actual_count++;
            }
        }
        update_post_meta($post_id, '_review_products_count', $actual_count);
        
        // Also remove the old json if it existed
        delete_post_meta($post_id, '_review_products');
    }
}

