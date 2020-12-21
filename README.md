# Perligo

<i><b>About Perligo</b></i>
The initial plan was to create a web application that allows users to convert .mp4 files into .mp3 files. Asides from that, people logged onto the webapp when converting a file would supposedly have the feature of having their .mp3 conversions be saved onto the Perligo Drive, thus allowing them to share their .mp3 files with other Perligo users.

While the capability of converting .mp4 files into .mp3 files remains true, the developers have opted to scrap the idea of having Perligo have its own drive but allowing Perligo users instead to automatically upload their .mp3 files onto their respective Google Drives. Google Drives will allow for more storage capacity and allow them to share their .mp3 files to more people, even those without a Perligo account.

<b>In regards to creating the Perligo Database</b>
1. In your phpmyadmin, create a database named 'perligo'
2. assuming that you have cloned this repository
  ->proceed to a cmd terminal to the path file where this repository is in your device
  ->type the command "npx sequelize db:migrate" ... this should create 2 tables in your perligo database
  


<b>Converting a file</b>
ASSUMPTIONS: 
            1. The .mp4 file that you wanna convert can be found in the same folder where you have cloned the perligo repository to your device
 STEPS:
      
