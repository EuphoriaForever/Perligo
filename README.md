# Perligo

<i><b>About Perligo</b></i>
The initial plan was to create a web application that allows users to convert .mp4 files into .mp3 files. Asides from that, people logged onto the webapp when converting a file would supposedly have the feature of having their .mp3 conversions be saved onto the Perligo Drive, thus allowing them to share their .mp3 files with other Perligo users.

While the capability of converting .mp4 files into .mp3 files remains true, the developers have opted to scrap the idea of having Perligo have its own drive but allowing Perligo users instead to automatically upload their .mp3 files onto their respective Google Drives. Google Drives will allow for more storage capacity and allow them to share their .mp3 files to more people, even those without a Perligo account.

<b>In regards to creating the Perligo Database</b>
1. In your phpmyadmin, create a database named 'perligo'
2. assuming that you have cloned this repository
  ->proceed to a cmd terminal to the path file where this repository is in your device
  ->type the command "npx sequelize db:migrate" ... this should create 1 table in your perligo database

<b>In regards to converting a file</b>
 1. The .mp4 file that you wanna convert can be found in the same folder where you have cloned the perligo repository to your device
 2. When you provide the name of the .mp4 file that you want to convert, <b>DO NOT</b> include the <i>.mp4</i> part when inputting said name; same goes for the .mp3 name<br>
e.g. (inputFile      ->   listen)   ... inputFile is a .mp4 file while listen is the .mp3 file converted from inputFile.mp4
<br><br>

<h2>Logging in to Perligo for the first time</h2>
  
You will be asked to chose to allow Perligo to save all conversions into a specific Google Drive. You will see a prompt that says: <br>
  "Authorize this app by visiting this url:"<br>
  This is followed by a link. You can browse to the URL provided on another machine, and then copy the authorization code back to the running sample. 
  Click accept.Copy the code you're given, paste it into the command-line prompt, and press Enter.

<i>Note that this will only happen when you've logged into Perligo for the first time. Everytime you convert something else, after your first log in, all .mp3 files will automatically be saved onto your device as well as your Google Drive</i>

<i>To change which google drive account your files are to be saved, delete the token.json and repeat the steps mentioned when Logging in for the first time</i>
