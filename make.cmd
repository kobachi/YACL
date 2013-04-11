@echo off
setlocal
set YACL_OUTPUT_DIR=%~dp0Release\
set YACL_JS=%YACL_OUTPUT_DIR%yacl.js
set YACL_MIN_JS=%YACL_OUTPUT_DIR%yacl.min.js
set YACL_TEMP=%YACL_OUTPUT_DIR%yacl.js.tmp

if not exist "%YACL_OUTPUT_DIR%" mkdir "%YACL_OUTPUT_DIR%"

echo /*>"%YACL_TEMP%"
echo  * YACL.js>>"%YACL_TEMP%"
echo  * Copyright(C) by kobachi>>"%YACL_TEMP%"
echo  */>>"%YACL_TEMP%"
echo (function(){>>"%YACL_TEMP%"
echo var YACL = {};>>"%YACL_TEMP%"
for /f %%f in (%~dp0make.lst) do (
	if exist %%f (
		copy /b "%YACL_TEMP%"+"%%f" "%YACL_TEMP%">NUL
		echo.>>"%YACL_TEMP%"
	)
)
echo })();>>"%YACL_TEMP%"
if exist "%YACL_JS%" del "%YACL_JS%"
if exist "%YACL_MIN_JS%" del "%YACL_MIN_JS%"
move %YACL_TEMP% %YACL_JS%>NUL
java -jar "%~dp0bin\compiler.jar" --js "%YACL_JS%" --compilation_level SIMPLE_OPTIMIZATIONS --js_output_file "%YACL_MIN_JS%"

:end
endlocal
