<?php
require("init.php");
@$un=$_REQUEST["userName"];
@$us=$_REQUEST["userSex"];
@$ua=$_REQUEST["userAddr"];
@$up=$_REQUEST["userPhone"];
@$ud=$_REQUEST["userDid"];
if(empty($un)||empty($us)||empty($ua)||empty($up)||empty($ud)){echo '[]'; return;}
$userTime=time()*1000;//得到当前时间戳
$sql="INSERT INTO car_order VALUES(null,'$up','$un','$us',$userTime,'$ua','$ud')";
$result=mysqli_query($conn,$sql);
$output=[];
if($result){
    $output['msg']="success";
    $output['oid']=mysqli_insert_id($conn);
    }
    else{
    $output['msg']="error";
    }
echo json_encode($output);
?>