<?php
require_once('./utils/getPages.php');

echo json_encode(getHTMLFiles("../../*.html"));


