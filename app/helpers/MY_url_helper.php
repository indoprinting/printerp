<?php

defined('BASEPATH') or exit('No direct script access allowed');

// Add admin_url
if (!function_exists('admin_url')) {
    function admin_url($uri = '', $protocol = null)
    {
        return get_instance()->config->site_url('admin/' . $uri, $protocol);
    }
}

// Add admin_redirect
if (!function_exists('admin_redirect')) {
    function admin_redirect($uri = '', $method = 'auto', $code = null)
    {
        if (!preg_match('#^(\w+:)?//#i', $uri)) {
            $uri = site_url('admin/' . $uri);
        }
        return redirect_to($uri, $method, $code);
    }
}

// Add shop_url
if (!function_exists('shop_url')) {
    function shop_url($uri = '', $protocol = null)
    {
        return get_instance()->config->site_url('shop/' . $uri, $protocol);
    }
}

// Add shop_redirect
if (!function_exists('shop_redirect')) {
    function shop_redirect($uri = '', $method = 'auto', $code = null)
    {
        if (!preg_match('#^(\w+:)?//#i', $uri)) {
            $uri = site_url('shop/' . $uri);
        }
        return redirect_to($uri, $method, $code);
    }
}
