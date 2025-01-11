<?php

namespace App\Helpers;



class Helper
{

    public static function isUrl($link)
    {
        return filter_var($link, FILTER_VALIDATE_URL);
    }
}
