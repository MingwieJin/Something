<?php
/**
 * socket发送指令API方法
 * @author Tony <goolegegle@gmail.com>
 * 此文件后期需加密
 */

/**
 * 针对于设备操作,可批量处理
 * @param unknown $order		指令(must)<br/>
 * 设备断开连接:router_disconn;
 * 修改无线设置:router_wireless;
 * 修改过滤关键词:router_keyword;
 * 设备重启:router_restart;
 * @param unknown $shebeiid		设备id(默认为0,多条id以,隔开)
 * @param int $shanghuid		商户id(默认为0)
 * @return unknown	参数错误({为空/0}输出错误信息) socket返回获取为空默认返回0 
 */
function socketApi($order='',$shebeiid=0,$shanghuid=0){
	global $YDSERVERPORT,$YDSERVERURL;
	$result = 0;
	$service_port =$YDSERVERPORT;
	$address =$YDSERVERURL;
	if(!empty($order) and (!empty($shebeiid) or !empty($shanghuid)) and !empty($service_port) and !empty($address)){
		$shebeiidArray=explode(',',$shebeiid);
		//创建socket,并连接
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);// 创建Socket
		if ($socket < 0){
			echo socket_strerror($socket);exit();//返回错误信息
		}else{
			//连接 $address 端口 $service_port
			$socketAddress = socket_connect($socket, $address, $service_port);//连接
			socket_set_option($socket,SOL_SOCKET,SO_RCVTIMEO,array("sec"=>1, "usec"=>0 ) );//设置发送超时为1秒
			socket_set_option($socket,SOL_SOCKET,SO_SNDTIMEO,array("sec"=>3, "usec"=>0 ) );//设置接收超时为3秒
			if ($socketAddress < 0){
				echo socket_strerror($socketAddress);exit();
			}else{
				//数据组装
				$json = array (
						'order' => $order,
						'shanghuid' => $shanghuid,
						'shebeiid'=> $shebeiidArray
				);
				//发送数据
				$in = "php-stream:";
				$in .= json_encode($json);
				$status = socket_write($socket, $in, strlen($in));

				if($status==false){
					$result=0;
					//echo socket_strerror($socket);exit();
				}else{
					$result = "";
					do{
						$buf = @socket_read($socket, 1024);
						if(trim($buf)=="" or !$buf){ break; }
						$result.=$buf;
					}while(true);
					if(empty($result)) $result=0;
					$result = mb_convert_encoding($result,'gb2312','utf-8');
				}
			}
		}
		socket_close($socket);// 关闭Socket
	}else{
		echo 'function_socket.php Function: socketApi lack of necessary parameters';exit();	
	}
	return $result;
}
/**
 * 针对于设备远程操作
 * @param int $acid		设备id(默认为0)
 * @param int $ap_id	APid(默认为0)
 * @param int $enable	是否开启远程(默认开启：78)
 */
function socketFar($acid=0,$apid=0,$enable=78){
	global $ACSERVERURL,$ACSERVERPORT;
	$data = array();
	$service_port =$ACSERVERPORT;
	$address =$ACSERVERURL;
	if(!empty($acid) and !empty($service_port) and !empty($address)){
		//创建socket,并连接
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP); 
		if ($socket < 0){
			echo socket_strerror($socket);exit();//返回错误信息
		}else{
			//连接 $address 端口 $service_port
			$socketAddress = socket_connect($socket, $address, $service_port);
			if ($socketAddress < 0){
				echo socket_strerror($socketAddress);exit();//返回错误信息
			}else{
				//数据组装
				$json = array (
				    'cmd' => 'proxy', //代理服务器
				    'ac_id' =>intval($acid),//设备id(默认为0)
					'ap_id' =>intval($apid),//APid(默认为0)
					'enable'=>intval($enable)//是否开启远程(默认开启：78)
				);
				//发送数据
				$in = "php-stream:";
				$in .= json_encode($json);
				$status = socket_write($socket, $in, strlen($in));//向服务端写入字符串信息，
				if($status===false){
					echo socket_strerror($socket);exit();//返回错误信息
				}else{
					$result = "";
					do{
						$buf = socket_read($socket, 1024);//读取服务端返回来的套接流信息
						if(!$buf){ break; }
						$result.=$buf;
					}while(true);
					$result=mb_convert_encoding($result,'utf-8','gb2312');//转化字符
					$data = json_decode($result,true);
					$data['data'] = iconv('utf-8','gb2312',$data['data']);将字符串的编码从UTF-8转到gb2312
				}
			}
		}
		socket_close($socket);
	}else{
		echo 'function_socket.php Function: socketFar lack of necessary parameters';exit();
	}
	if(empty($data)){
		echo  '<script>alert("没有查找到设备");window.close()</script>';
		die;
	}else{
		if($data['res']==2){
			echo  '<script>alert("'.$data['data'].'");window.close();</script>';
		
		}elseif($data['res']==1){
			echo '<script>location.href="http://'.$data['data'].'"</script>';
		}
	}
}


/**
 * 针对于设备AC远程操作
 * @param int $acid		设备id(默认为0)
 * @param int $ap_id	APid(默认为0)
 * @param int $enable	是否开启远程(默认开启：78)
 */
function socketAcFar($acid=0,$apid=0,$enable=78){
	global $ACACSERVERURL,$ACACSERVERPORT;
	$data = array();
	$service_port =$ACACSERVERPORT;
	$address =$ACACSERVERURL;
	if(!empty($acid) and !empty($service_port) and !empty($address)){
		//创建socket,并连接
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if ($socket < 0){
			echo socket_strerror($socket);exit();
		}else{
			//连接 $address 端口 $service_port
			$socketAddress = socket_connect($socket, $address, $service_port);
			if ($socketAddress < 0){
				echo socket_strerror($socketAddress);exit();
			}else{
				//数据组装
				$json = array (
						'cmd' => 'proxy',
						'ac_id' =>intval($acid),
						'ap_id' =>intval($apid),
						'enable'=>intval($enable)
				);
				//发送数据
				$in = "php-stream:";
				$in .= json_encode($json);
				$status = socket_write($socket, $in, strlen($in));
				if($status===false){
					echo socket_strerror($socket);exit();
				}else{
					$result = "";
					do{
						$buf = socket_read($socket, 1024);
						if(!$buf){ break; }
						$result.=$buf;
					}while(true);
					$result=mb_convert_encoding($result,'utf-8','gb2312');
					$data = json_decode($result,true);
					$data['data'] = iconv('utf-8','gb2312',$data['data']);
				}
			}
		}
		socket_close($socket);
	}else{
		echo 'function_socket.php Function: socketFar lack of necessary parameters';exit();
	}
	if(empty($data)){
		echo  '<script>alert("没有查找到设备");window.close()</script>';
		die;
	}else{
		if($data['res']==2){
			echo  '<script>alert("'.$data['data'].'");window.close();</script>';

		}elseif($data['res']==1){
			echo '<script>location.href="http://'.$data['data'].'"</script>';
		}
	}
}

/**
 * 针对于mac操作(单一调用)
 * @author Tony <goolegegle@gmail.com>
 * @param unknown $order		指令(must)<br/>
 * 踢出mac:mac_takeout;
 * mac上线:mac_online;
 * @param unknown $shebeiid		设备id(must)
 * @param unknown $shang_pkid	shang_maclist表id(must)
 * @param unknown $mac			mac地址(must)
 * @return unknown	参数错误({为空/0}输出错误信息) socket返回获取为空默认返回0 
 */
function socketMac($order='',$shebeiid=0,$shang_pkid=0,$mac=0){
	global $YDSERVERPORT,$YDSERVERURL;
	$result = 0;
	$service_port =$YDSERVERPORT;
	$address =$YDSERVERURL;
	if(!empty($order) && !empty($shebeiid) && !empty($shang_pkid) && !empty($mac)){
		//创建socket,并连接
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if ($socket < 0){
			echo socket_strerror($socket);exit();
		}else{
			//连接 $address 端口 $service_port
			$socketAddress = socket_connect($socket, $address, $service_port);
			if ($socketAddress < 0){
				echo socket_strerror($socketAddress);exit();
			}else{
				//数据组装
				$json = array (
						'order'		=> $order,
						'shebeiid'	=> $shebeiid,
						'shang_pkid'=> $shang_pkid,
						'mac'		=> $mac
				);
				//发送数据
				$in = "php-stream:";
				$in .= json_encode($json);
				$status = socket_write($socket, $in, strlen($in));
				if($status===false){
					echo socket_strerror($socket);exit();
				}else{
					$result = "";
					do{
						$buf = socket_read($socket, 1024);
						if(!$buf){ break; }
						$result.=$buf;
					}while(true);
					if(empty($result)) $result=0;
					$result = mb_convert_encoding($result,'gb2312','utf-8');
				}
			}
		}
		socket_close($socket);
	}else{
		echo 'function_socket.php Function: socketMac lack of necessary parameters';exit();	
	}
	return $result;
}


/**
 * 针对于mac上线操作(单一调用)
 * @author Tony <goolegegle@gmail.com>
 * @param unknown $shebeiid		设备id(must)
 * @param unknown $shang_pkid	shang_maclist表id(must)
 * @param unknown $reservid		服务器id(must)
 * @param unknown $mac			mac地址(must)
 * @return unknown	参数错误({为空/0}输出错误信息) socket返回获取为空默认返回0，成功返回1
 */
function socketOnLine($shebeiid=0,$shang_pkid=0,$reservid=0,$mac=0){
	$order = 'mac_online';
	global $db;
	$result = 0;
	if(!empty($shebeiid) && !empty($shang_pkid) && !empty($reservid) && !empty($mac)){
		$serverInfo = $db->getinfo("select top 1 servip,onlinemacport from mx_sys_reserver where id='$reservid'");
		$service_port = $serverInfo['onlinemacport'];
		$address = $serverInfo['servip'];
		//创建socket,并连接
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if ($socket < 0){
			echo socket_strerror($socket);exit();
		}else{
			//连接 $address 端口 $service_port
			$socketAddress = socket_connect($socket, $address, $service_port);
			socket_set_option($socket,SOL_SOCKET,SO_RCVTIMEO,array("sec"=>1, "usec"=>0 ) );//设置发送超时为1秒
			socket_set_option($socket,SOL_SOCKET,SO_SNDTIMEO,array("sec"=>3, "usec"=>0 ) );//设置接收超时为3秒
			if ($socketAddress < 0){
				echo socket_strerror($socketAddress);exit();
			}else{
				//数据组装
				$json = array (
						'order'		=> $order,
						'shebeiid'	=> $shebeiid,
						'shang_pkid'=> $shang_pkid,
						'mac'		=> $mac,
				);
				//发送数据
				$in = "php-stream:";
				$in .= json_encode($json);
				$status = socket_write($socket, $in, strlen($in));
				if($status===false){
					echo socket_strerror($socket);exit();
				}else{
					$result = "";
					do{
						$buf = @socket_read($socket, 1024);
						if(!$buf){ break; }
						$result.=$buf;
					}while(true);
					if(trim($result)=='') $result=1;//超时后，默认为1
					if($result!=1) $result=0;//失败
					$result = mb_convert_encoding($result,'gb2312','utf-8');
				}
			}
		}
		socket_close($socket);
	}else{
		echo 'function_socket.php Function: socketOnLine lack of necessary parameters';exit();
	}
	return $result;
}

