<?php

include_once __DIR__."/../abstract/module.php";

use \server\abstracts\module;

class login extends module {
    private static $userDetails;

    public function __construct(){
        parent::__construct();
        // default to fail template
        $this->repFailTemplate["errors"] = [
            "errMsg"=>"Invalid credentials entered",
        ];
        $this->response = $this->repFailTemplate;
    }

    public function process(){
        $this->authenticate();
        return $this;
    }

    private function authenticate(){
        if(!$this->checkUserInDb() || !$this->checkUserPwdAndStatus()){
            $this->response = $this->repFailTemplate;
            return;
        }
        // set the session values, @todo: move this part to seperate function
        if($timeUpdatedForUser = $this->updateTimeInforUser()){
            $_SESSION["userId"] = self::$userDetails['user_id'];
            $this->respSuccessTemplate['content']["user"] = base64_encode(self::$userDetails['user_id']);
            $this->respSuccessTemplate['content']["nick"] =self::$userDetails['user_nick_name'];
            $this->respSuccessTemplate['content']["loginTime"] =$timeUpdatedForUser;
            $this->response = $this->respSuccessTemplate;
        }
        
    }

    // update last login time
    private function updateTimeInforUser(){
        $time = time();
        $timestamp = date("Y-m-d H:i:s", $time);
        $preparedSql = $this->database->prepare(
            "UPDATE user_details SET last_login_time = :utime WHERE user_id = :userid"
        );
        $preparedSql->execute([':userid'=>self::$userDetails['user_id'], ':utime'=>$timestamp]);
        return ($preparedSql->rowCount() > 0)? $time: FALSE;
    }

    // check pwd & user status
    private function checkUserPwdAndStatus(){
        $preparedSql = $this->database->prepare(
            "SELECT * FROM user_details WHERE user_name = :uname " . 
            "AND email_id_status = 'Y' AND status = 'Y'"
        );
        $preparedSql->execute([':uname'=>$this->inputs['uname'][0]]);
        self::$userDetails = $preparedSql->fetch(PDO::FETCH_ASSOC);
        return password_verify($this->inputs["pword"][0], self::$userDetails['user_password']);
    }

    // user not present
    private function checkUserInDb(){
        $preparedSql = $this->database->prepare("SELECT 1 FROM `user_details` WHERE `user_name` = :uname");
        $preparedSql->execute([':uname'=>$this->inputs['uname'][0]]);
        return ($preparedSql->rowCount() > 0);
    } 

    public function getResponse(){
        echo json_encode($this->response);
    }
}

?>