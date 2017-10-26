<?php
require("init.php");
@$kw=$_REQUEST["kw"] or die('{"code":-1,"msg":"请输入关键词"}');
if(empty($kw))
{
  echo '[]';
  return;
}
$sql="SELECT name,car_license,mileage,img_sm FROM carList WHERE name OR detail LIKE '%$kw%'";
$result=mysqli_query($conn,$sql);
$output=[];
while(true){
        $row=mysqli_fetch_assoc($result);
        if(!$row){break;}
        $output[]=$row;
     }
echo json_encode($output);
?>