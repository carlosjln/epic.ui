@echo off
cls
echo ***
echo *** Packaging NODUS.JS
echo ***
echo.

SET "feed=C:\Workenv\Tools\Nuget\feed\"
SET "prev=%feed%..\previous_versions\"
set "nuget=%CD%\..\Tools\NuGet.exe"

IF NOT EXIST %feed% MKDIR %feed%
IF NOT EXIST %prev% MKDIR %prev%

IF EXIST %feed%"epic.ui.1.*" MOVE /Y %feed%"epic.ui.1.*" %prev%

CALL %nuget% pack "../epic.ui/epic.ui.nuspec" -OutputDirectory %feed%
echo.

SET cmd="dir %feed%*.nupkg /s /b | findstr /i "epic.ui.1""
FOR /F %%F IN (' %cmd% ') DO (
	echo Pushing file %%F
	call %nuget% push "%%F"
	echo.
)

echo I'm done :)
echo.

PAUSE