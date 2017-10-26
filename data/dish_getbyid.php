<?php
require("init.php");
@$id=$_REQUEST["did"];
if(empty($id))
{
  echo '[]';
  return;
}
$sql="SELECT name,price,img_lg,detail,car_license,mileage,did FROM carList WHERE did=$id";
$result=mysqli_query($conn,$sql);
$output=[];
while(true){
        $row=mysqli_fetch_assoc($result);
        if(!$row){break;}
        $output[]=$row;
     }
echo json_encode($output);
?>