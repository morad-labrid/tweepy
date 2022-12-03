<?php

$curl = curl_init();
$tweet_link = $_POST['tweet_link'];
// Change the Bearer token with yours: https://developer.twitter.com
$token = 'Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAAHHjwEAAAAAB4HQa5sbotfuk0r6I%2BsGFZZTHtI%3DuY3OUdHqawcxtvi6UuCKAGNsDaeYFHzynm6cr6viOAADxu8kRE';
if (isset($_POST['tweet_link'])) {
    curl_setopt_array($curl, array(
        CURLOPT_URL => $tweet_link,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array($token),
    ));

    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
} else {
    header("Location: /");
}