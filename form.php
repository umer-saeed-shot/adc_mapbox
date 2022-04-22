<?php

// ENTER YOUR EMAIL


$emailTo = "testing@myprojectstaging.net";


// ENTER IDENTIFIER
$emailIdentifier =  "Message sent via contact form " . $_SERVER["SERVER_NAME"];



/** 2. MESSAGES
***********************/


// ERROR OR EMPTY FIELD
$errrorEmptyField = "* This Field is required!";


// ERROR FOR INVALID EMAIL
$errrorEmailInvalid = "* This Email is Invalid!";


// SUCCESS MESSAGE
$successMessage = "* The Email was Sent Successfully!";


/** 3. MAIN SCRIPT
***********************/




    // $get_in_touch = addslashes(trim($_POST["get_in_touch"]));
    $firstname = addslashes(trim($_POST["firstname"]));
    $lastname = addslashes(trim($_POST["lastname"]));
    $email = addslashes(trim($_POST["email"])); 
    $phone = addslashes(trim($_POST["phone"]));
    $method = addslashes(trim($_POST["contact_method"]));
	$message = addslashes(trim($_POST["msg"]));

   // $array = array("firstname" => "", "email" => "", "message" => "","succesMessage" => "");
    $array = array("firstname" => "", "lastname" => "");

 
	

		
		$array["succesMessage"] = $successMessage;
		
		$headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= "From: " . $firstname . $lasttname . " <" . $email  .">\r\n";
		$headers .= "Reply-To: " . $email;
		
		
	$message2 = '<html><body>';
    $message2 .= "<p style='color:#000'> <strong>First Name: </strong>" . $firstname . "</p>";
    $message2 .= "<p style='color:#000'> <strong>Last Name: </strong>" . $lastname . "</p>";
    $message2 .= "<p style='color:#000'> <strong>Email: </strong>" . $email . "</p>";
    $message2 .= "<p style='color:#000'> <strong>Phone: </strong>" . $phone . "</p>";
    $message2 .= "<p style='color:#000'> <strong>Method of contact: </strong>" . $method . "</p>";
    $message2 .= "<p style='color:#000'> <strong> Message: </strong>" .$message."</p>";

    $message2 .= '</body></html>';
		
	   $result = mail($emailTo, $emailIdentifier, $message2, $headers);
	   
       if ($result) {
        echo $successMessage;
          header('location:https://myprojectstaging.net/html/adc-roofle/map.html');
          

        }  else {
            echo "https://myprojectstaging.net/html/adc-roofle/map.html";

        }
		
  

   // echo json_encode($array);



?>