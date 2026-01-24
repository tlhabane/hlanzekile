<?php

require_once ('functions.php');

$response = 'Oops! Something went wrong while processing your request, please try again.';
http_response_code(400);

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    // get posted data
    $input_data     = json_decode(file_get_contents("php://input"));
    // post values
    $email 		= sanitizeEmail($input_data->email);
    $subject = SITE_NAME . ' subscription';

    if(!empty($email)){
        http_response_code(200);
        // email html headers
        $headers 	= "From: <" . $email . ">\r\n";
        $headers 	.= "MIME-Version: 1.0\r\n";
        $headers 	.= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        $header		= '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body style="margin: 0; padding: 15px; background-color: #ffffff; font-family: Tahoma, Geneva, sans-serif; font-size: 14px; color: #525252; line-height: 17px;"><p><a href="'. SITE_ROOT .'"><img src="' . SITE_LOGO . '" width="200" /></a></p>';

        $footer		= '<p style="text-align: left; color: #525252; font-size: 10px; line-height: 11px;"><strong>Attention:</strong><br />The information contained in this message and or attachments is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged material.  Any review, retransmission, dissemination or other use of, or taking of any action in reliance upon, this information by persons or entities other than the intended recipient is prohibited. If you received this in error, please contact the sender and delete the material from any system and destroy any copies.<br /><br />Thank You.</p></body></html>';

        $message 	= $header . '<p>Good day,</p>Kindly add my email address to your mailing list: ' .$email . '<br />Thank you.</p>' . $footer;

        // send to sender
        if( mail(SITE_MAIL, $subject, $message, $headers) ) {
            // send to client
            $subject = 'RE: Confirmation of subscription';
            $headers = "From: " . SITE_NAME . " <" . SITE_MAIL . ">\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            $message = $header . '<p>Good day,</p>';
            $message .= '<p>Thank you for subscribing to our mailing list, you will be the first to receive energy saving tips, latest news and exclusive special offers.</p>' . $footer;

            if( mail($email, $subject, $message, $headers) ) {
                $response = 'Thank you for subscribing to our mailing list.';
            }

        }

    }
    else {
        http_response_code(422);
        $response = 'Invalid email address provided, please double-check and try again.';
    }
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(["message" => $response]);