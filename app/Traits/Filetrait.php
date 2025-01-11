<?php

namespace App\Traits;

use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

trait Filetrait
{
    public function castingFile(string|null $defaultData = null, string $defaultPath = ''): Attribute
    {
        $defaultData ??= '';
        return Attribute::make(
            get: function (string|null $value) use ($defaultData) {
                if (!empty($value)) {
                    $files = json_decode($value, true);
                    if (is_array($files)) {
                        return array_map(function ($file) use ($defaultData) {
                            if (Helper::isUrl($file)) {
                                return $file;
                            } else {
                                return Storage::disk('public')->exists($file)
                                    ? Storage::disk('public')->url($file)
                                    : $defaultData;
                            }
                        }, $files);
                    } else {
                        if (Helper::isUrl($value)) {
                            return $value;
                        } else {
                            return Storage::disk('public')->exists($value)
                                ? Storage::disk('public')->url($value)
                                : $defaultData;
                        }
                    }
                } else {
                    return $defaultData;
                }
            },
            set: function (mixed $value) use ($defaultPath) {
                if (is_array($value)) {
                    $paths = [];
                    foreach ($value as $file) {
                        if (!empty($file)) {
                            if (Helper::isUrl($file)) {
                                $paths[] = $file;
                            } else {
                                $paths[] = $file->store($defaultPath, 'public');
                            }
                        }
                    }
                    return json_encode($paths);
                } else {
                    if (!empty($value)) {
                        if (Helper::isUrl($value)) {
                            return $value;
                        } else {
                            return $value->store($defaultPath, 'public');
                        }
                    } else {
                        return null;
                    }
                }
            }
        );
    }
}

