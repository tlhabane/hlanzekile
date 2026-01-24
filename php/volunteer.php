<?php

require_once ('functions.php');

$response = 'Oops! Something went wrong while processing your request, please try again.';
http_response_code(400);

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    // get posted data
    $input_data     = json_decode(file_get_contents("php://input"));

    // post values
    $area 		= sanitizeString($input_data->area);
    $date 		= sanitizeString($input_data->date);
    $age 		= sanitizeString($input_data->age);
    $name 		= sanitizeString($input_data->name);
    $tel 		= sanitizeString($input_data->tel);
    $email 		= sanitizeEmail($input_data->email);
    $medical	= sanitizeString($input_data->medical);
    $emergencyName1 = sanitizeString($input_data->emergencyName1);
    $emergencyPhone1 = sanitizeString($input_data->emergencyPhone1);
    $emergencyName2 = sanitizeString($input_data->emergencyName2);
    $emergencyPhone2 = sanitizeString($input_data->emergencyPhone2);
    $safetyConsent = sanitizeEmail($input_data->safetyConsent);
    $mediaConsent = sanitizeString($input_data->mediaConsent);

    $headers 	= "From: " . $name . " <" . $email . ">\r\n";
    $headers 	.= "MIME-Version: 1.0\r\n";
    $headers 	.= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    $header		= '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body style="margin: 0; padding: 15px; background-color: #ffffff; font-family: Tahoma, Geneva, sans-serif; font-size: 14px; color: #525252; line-height: 17px;"><p><a href="'. SITE_ROOT .'"><img src="' . SITE_LOGO . '" width="200" /></a></p>';

    $footer		= '<p style="text-align: left; color: #525252; font-size: 10px; line-height: 11px;"><strong>Attention:</strong><br />The information contained in this message and or attachments is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged material.  Any review, retransmission, dissemination or other use of, or taking of any action in reliance upon, this information by persons or entities other than the intended recipient is prohibited. If you received this in error, please contact the sender and delete the material from any system and destroy any copies.<br /><br />Thank You.</p></body></html>';

    $message 	= $header;
    $message 	.= "<p>Hi Hlanzekile team, please add me to your volunteer list for ${area}, my details are as follows:</p>";
    $message    .= '<table width="100%" cellpadding="2" cellspacing="1" style="font-size: 12px; color: #525252; border-bottom: 0.1mm solid #efefef;">';
    $message    .= '<tbody>';
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Name</td>';
    $message    .= '<td>' . $name . '</td>';
    $message    .= '</tr>';
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Age</td>';
    $message    .= '<td>' . $age . '</td>';
    $message    .= '</tr>';
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Tel</td>';
    $message    .= '<td>' . $tel . '</td>';
    $message    .= '</tr>';
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Email</td>';
    $message    .= '<td>' . $email . '</td>';
    $message    .= '</tr>';
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Medical Condition/Allergies</td>';
    $message    .= '<td>' . ($medical ?? 'None') . '</td>';
    $message    .= '</tr>';
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Emergency Contact</td>';
    $message    .= '<td>' . $emergencyName1 . ' - ' . $emergencyPhone1 . '</td>';
    $message    .= '</tr>';
    if (!empty(trim($emergencyName2))) {
        $message    .= '<tr>';
        $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Emergency Contact (Alt.)</td>';
        $message    .= '<td>' . $emergencyName2 . ' - ' . $emergencyPhone2 . '</td>';
        $message    .= '</tr>';
    }
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Safety Consent</td>';
    $message    .= '<td>' . $safetyConsent . '</td>';
    $message    .= '</tr>';
    $message    .= '<tr>';
    $message    .= '<td style="width: 25%; font-weight: bold; padding: 10px 0;">Media Consent</td>';
    $message    .= '<td>' . $mediaConsent . '</td>';
    $message    .= '</tr>';
    $message    .= '</tbody>';
    $message    .= '</table>';
    $message 	.= $footer;

    $mail_subject = 'Volunteer Signup';
    if( mail(SITE_MAIL, $mail_subject, $message, $headers) ) {
        // send to client
        $subject = "RE: Confirmation of receipt";
        $headers = "From: " . SITE_NAME . " <" . SITE_MAIL . ">\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $message = $header . '<p>Good day ' . ucwords($name) . ',</p>';
        $message .= '<p>Thank you for signing up for ' . SITE_NAME . '\'s volunteer program,  one of our consultants will be in touch with you shortly.</p>' . $footer;

        if( mail($email, $subject, $message, $headers) ) {
            $response = 'Thank you for contacting ' . SITE_NAME . ', one of our consultants will be in touch with you shortly';
        }

    }
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(["message" => $response]);
