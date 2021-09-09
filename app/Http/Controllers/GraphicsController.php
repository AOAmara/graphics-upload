<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class GraphicsController extends Controller
{
        /**
         * Upload Graphic File
         * @param $request
         * @return JSON response
         */
        public function fileUpload(Request $request) {
            $response = [];
            $validator = Validator::make($request->all(),[
                  'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 401);
             }

             $fileModel = new File;

            if ($files = $request->file('file')) {
                $fileName = time().'_'.$request->file->getClientOriginalName();
                $filePath = $request->file('file')->storeAs('uploads', $fileName, 'public');

                $fileModel->name = time().'_'.$request->file->getClientOriginalName();
                $fileModel->file_path = '/storage/' . $filePath;
                $fileModel->save();

                return response()->json([
                    "success" => true,
                    "message" => "File successfully uploaded",
                    "fileName" => $fileName,
                    "filePath" => $filePath
                ]);

            }
            else{
                $response["status"] = "failed";
                $response["message"] = "Failed! File(s) not uploaded";
            }
            return response()->json($response);
        }
}
