<?php

header('Access-Control-Allow-Origin: *');
session_id(1);
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// $jsonCoordinates = file_get_contents('php://input');
	//
	// $coordinates = json_decode($jsonCoordinates);

	$coordinates = json_decode(file_get_contents('php://input'), true);
	print_r($coordinates);

	$accelerometerX = $coordinates['x'];
	$accelerometerY = $coordinates['y'];
	$accelerometerZ = $coordinates['z'];

	$_SESSION['x'] = $accelerometerX;
	$_SESSION['y'] = $accelerometerY;
	$_SESSION['z'] = $accelerometerZ;

	// $data = json_decode(file_get_contents('php://input'), true);
	// print_r($data);
	echo $_SESSION['z'];
}
else if($_SERVER['REQUEST_METHOD'] === 'GET'){

// unset ($_SESSION['x']);
// unset ($_SESSION['y']);
// unset ($_SESSION['z']);

$coordinates = array(
	'x' => $_SESSION['x'],
	'y' => $_SESSION['y'],
	'z' => $_SESSION['z']
);
	echo json_encode ($coordinates);
}
?>
