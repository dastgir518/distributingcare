<?php
/**
 * Register a custom REST API endpoint to serve a specific WordPress menu.
 * 
 * Endpoint: /wp-json/custom/v1/menu/<id>
 * Example: /wp-json/custom/v1/menu/7
 */
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/menu/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_custom_menu',
        'permission_callback' => '__return_true', // Open to public
        'args' => array(
            'id' => array(
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
});

/**
 * Callback function to get menu items and format them for the REST API.
 */
function get_custom_menu($data) {
    $menu_id = $data['id'];
    $menu_items = wp_get_nav_menu_items($menu_id);

    if (!$menu_items) {
        return new WP_Error('no_menu', 'Invalid menu ID or empty menu', array('status' => 404));
    }

    $formatted_menu = array();

    foreach ($menu_items as $item) {
        // Skip child items for the first pass, they'll be added to parents later if needed
        if ($item->menu_item_parent != 0) {
            continue;
        }

        $menu_item = array(
            'id' => $item->ID,
            'title' => $item->title,
            'url' => $item->url,
            'children' => array()
        );

        // Find children for this parent
        foreach ($menu_items as $child) {
            if ($child->menu_item_parent == $item->ID) {
                $menu_item['children'][] = array(
                    'id' => $child->ID,
                    'title' => $child->title,
                    'url' => $child->url,
                );
            }
        }

        $formatted_menu[] = $menu_item;
    }

    return rest_ensure_response($formatted_menu);
}
