SET NAMES 'utf8';
DROP DATABASE IF EXISTS chengXinCar;
CREATE DATABASE chengXinCar CHARSET=UTF8;
USE chengXinCar;
CREATE TABLE carList(
    did INT PRIMARY KEY AUTO_INCREMENT,
    img_sm VARCHAR(64),
    img_lg VARCHAR(64),
    name VARCHAR(64),
    car_license VARCHAR(64),
    mileage FLOAT(6,2),
    price FLOAT(6,2),
    detail VARCHAR(2048)
);
INSERT INTO carList(did,img_sm,img_lg,name,car_license,mileage,price,detail) VALUES
(   null,
    'p01.jpg',
    'p01-l.jpg',
    '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
    '2014-11',
    6.4,
    33.30,
    '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
),
(   null,
        'p01.jpg',
        'p01-l.jpg',
        '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
        '2014-11',
        6.4,
        33.30,
        '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
),
(   null,
        'p01.jpg',
        'p01-l.jpg',
        '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
        '2014-11',
        6.4,
        33.30,
        '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
),
(   null,
        'p01.jpg',
        'p01-l.jpg',
        '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
        '2014-11',
        6.4,
        33.30,
        '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
),
(  null,
       'p01.jpg',
       'p01-l.jpg',
       '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
       '2014-11',
       6.4,
       33.30,
       '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
),
(   null,
        'p01.jpg',
        'p01-l.jpg',
        '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
        '2014-11',
        6.4,
        33.30,
        '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
),
(  null,
       'p01.jpg',
       'p01-l.jpg',
       '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
       '2014-11',
       6.4,
       33.30,
       '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
),
(   null,
        'p01.jpg',
        'p01-l.jpg',
        '路虎揽胜极光 2014款 2.0T 5门耀动版(进口)',
        '2014-11',
        6.4,
        33.30,
        '该车骨架完好，排除事故车，发动机机爪螺丝有拆卸痕迹，发动机变速箱工作正常，内饰干净整洁正常磨损，车身局部钣金喷漆，一直按时定期保养，整体车况不错。'
);

##SELECT * FROM kf_dish;

CREATE TABLE car_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(16),
    user_name VARCHAR(16),
    sex INT,    /*1:男  2:女*/
    order_time BIGINT,
    addr VARCHAR(256),
    did INT
);
INSERT INTO car_order(oid, phone,user_name,sex,order_time,addr,did) VALUES
(NULL,'13501234567','婷婷',2,1445154859209,'大钟寺中鼎B座',3),
(NULL,'13501234567','婷婷',2,1445254959209,'大钟寺中鼎B座',2),
(NULL,'13501234567','婷婷',2,1445354959209,'大钟寺中鼎B座',5);

##SELECT * FROM car_order;

INSERT INTO car_order VALUES(NULL,'13501234567','婷婷','1',now(),'大钟寺','6');

SELECT d.did,d.img_sm,o.order_time,o.user_name FROM car_order o,carList d WHERE o.did=d.did;