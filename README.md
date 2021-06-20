# Tokyo Timezone App

Application used to show Tokyo current time and user browser current time.

## Requirements

* docker

## Building from source

*There is no need to build if you just want to run the application, since I uploaded the containers to my github account. You can jump to the next session*

#### **Windows**

Run the script `$ start.bat` as root. Make sure that docker is in your $PATH.

#### **Linux**

Run the script `$ start.sh` as root. Make sure that docker is in your $PATH.

## Running the app

- Open your terminal
- Go to the root application folder
- execute `$ docker compose up`

Make sure that docker is in your $PATH.

## How to use it

Open your browser on the address: `http://localhost:4200`
<p align="center">
<img src="https://i.ibb.co/g4pX2H0/Screenshot-2021-06-20-185824.png" alt="Screenshot-2021-06-20-185824" border="0" />
</p>

As you can see on the image above, a popup card is shown above Tokyo that shows current time and day at that location, and also another popup card that will be located at the middle of the user's current timezone, since it is not yet possible to know which city user is located to put the card in the correct position.

The time is updated each second.

## Tests

#### **Services**
You need to install Go https://golang.org/

- Open your terminal
- Navigate to ./services
- run `$ go test ./...`

#### **Portal**
You need to install Angular https://angular.io/

- Open your terminal
- Navigate to ./portal
- run `$ ng test`

## Possible improvements

- Add more than just tokyo timezone
- Add more tests, currently this project has 80% of cover for front-end and 100% for the back-end