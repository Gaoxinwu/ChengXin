<?php
require("init.php");
@$phone=$_REQUEST['phone'] or die('{"code":-1,"msg":"未查询到对应数据，电话号码可能有误"}');
if(empty($phone)){
    echo '[]';
    return;
    }
$sql="SELECT o.oid,d.did,d.img_sm,o.order_time,o.user_name FROM car_order o,carList d WHERE phone=$phone AND o.did=d.did";
$result=mysqli_query($conn,$sql);
$output=[];
while(true){
        $row=mysqli_fetch_assoc($result);
        if(!$row){break;}
        $output[]=$row;
     }
echo json_encode($output);
?>