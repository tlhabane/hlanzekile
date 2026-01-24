<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PATCH, PUT, OPTIONS, GET, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

const SITE_ROOT = '/hlanzekile/';
const SITE_NAME = 'Hlanzekile River & Ocean Cleaning';
const SITE_LOGO = SITE_ROOT . 'assets/logo-color.png';
const SITE_MAIL = 'kreativware@gmail.com';
const MAIL_SUBJECT = '';

/**
 * String sanitizer
 *
 * @param string|null $inputString
 * @return string
 */
function sanitizeString(?string $inputString): string
{
    if (is_null($inputString)) {
        return '';
    }

    $search = array(
        '@<script[^>]*?>.*?</script>@si',   /* strip out javascript */
        '@<[\/\!]*?[^<>]*?>@si',            /* strip out HTML tags */
        '@<style[^>]*?>.*?</style>@siU',    /* strip style tags properly */
        '@<![\s\S]*?--[ \t\n\r]*>@'         /* strip multi-line comments */
    );

    return preg_replace($search, '', $inputString);
}

/**
 * Email address sanitizer
 *
 * @param string|null $email
 * @return string
 */
function sanitizeEmail(?string $email): string
{
    if (!is_null($email)) {
        $email_address = trim(strtolower($email));
        if (filter_var($email_address, FILTER_SANITIZE_EMAIL) !== false) {
            return $email_address ;
        }
    }

    return '';
}

/**
 * Upload file function
 *
 * @param string $folder
 * @param string $tmpPath
 * @param string $filename
 * @return string
 */
function upload_file(string $folder, string $tmpPath, string $filename): string
{
    if (is_uploaded_file($tmpPath)) {
        $filepath = $folder . $filename;
        move_uploaded_file($tmpPath, $filepath);
        return $filepath;
    }
    return '';
}
