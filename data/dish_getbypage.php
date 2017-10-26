<?php
require("init.php");
@$s=$_REQUEST["start"];// or die('{"code":-1,"msg":"需要起始行"}');
$i=5;
$n=$s;
$sql="SELECT did,name,price,img_sm,car_license,mileage FROM carList LIMIT $n,$i";
$result=mysqli_query($conn,$sql);
$output=[];
while(true)
{
  $row = mysqli_fetch_assoc($result);
  if(!$row)
  {
    break;
  }
  $output[] = $row;
}
echo json_encode($output);
//if(count($rows)>0){
//    echo json_encode($rows);
//}
//else{
//    echo '{"code":-2,"msg":"暂时没有更多了"}';
//}
?>