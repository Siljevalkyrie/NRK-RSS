<?php
    $feedUrl = $_GET ['feedUrl'];
	//$xml_feed_url = 'http://www.nrk.no/viten/toppsaker.rss';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $feedUrl);
	//curl_setopt($ch, CURLOPT_URL, $xml_feed_url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $xml = curl_exec($ch);
    curl_close($ch);
    echo $xml;
?>
