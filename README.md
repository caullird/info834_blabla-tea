# 🔈🍵 - Blabla tea 

The aim of this project was to create a chat room for friends! We had two 4-hour sessions to complete this project! The objectives were the following: 

👦🏻 **Project objective for the user experience**

    ✅ Allow users to create an account 

    ✅ Allow users to login / logout

    ✅ Allow users to know who is logged in

    ✅ Allow users to retrieve conversation history with another user 

    ✅ Allow users to open a conversation with another user 


🛠️ **Project objective at technical implementation level**

    ✅ Using Node.js for the application structure

    ✅ Use MongoDB for data storage

    ✅ Use socket.io for interaction management

    ✅ Have a fault tolerant application (use of Replicaset)

    ✅ Unit testing with Node.js


## 👀 Quick overview of our project 

When the user arrives on our application, he has the possibility to log in (left image), or to create an account (right image). 

![image](https://user-images.githubusercontent.com/54810120/159251745-6a255d5c-1d36-4e57-8c7e-7c185071001d.png)

When the user logs in, an example conversation is visible, to explain very quickly what is possible in our project

![image](https://user-images.githubusercontent.com/54810120/159509653-3d0c15a2-77eb-46a0-9b29-cb0ddd007ebc.png)

The different users who are connected (indicated with the "online" at the top left), can communicate 

![image](https://user-images.githubusercontent.com/54810120/159510086-41633dfa-2e79-495c-ac2b-4bd4d7791065.png)


To find out more and try out all the features, it's best to try out our application! 

## 🛠️ **How to use** 

1️⃣ **Clone the Git**

2️⃣ **Modify the configuration file to match your environment** (in the configuration file [here](https://github.com/caullird/info834_blabla-tea/blob/main/config.json))

```json
{
	"db": {
		"host": "127.0.0.1",
		"port": 27017,
		"name": "chat"
	},
	"sessionSecret": "123soleil",
	"redis": {
		"host": "127.0.0.1",
		"port": 6379,
		"password": ""
	}
}
```

3️⃣ **Install the packages**

```sh
yarn or npm install
```

4️⃣ **Start MongoDB using replicaset (optional)**

If you have problems with the replicaset, you can simply follow step 8️⃣

```sh
mongod --replSet rs0 --port 27017 --dbpath ./data/r0s1
```
```sh
mongod --replSet rs0 --port 27018 --dbpath ./data/r0s2
```
```sh
mongod --replSet rs0 --port 27019 --dbpath ./data/r0s3
```

5️⃣ **Start the arbiter (optional)**

```sh
mongod--port 30000 --dbpath ./data/arb --replSet rs0
```

6️⃣ **Defind roles of mongod servers (optional)**

```sh
mongo --port 27017
```

7️⃣ **Last step to complete the configuration (optional)** 

```txt
rs.initiate()
rs.conf()
rs.add("localhost:27018")
rs.add("localhost:27019")
rs.addArb("localhost:30000")
```

8️⃣❗ **Step to follow only in case of a problem with the replicat set**

```txt
rmdir /S data
mkdir data
```

9️⃣**You can now start the services !** 

```txt
open redis-server.exe from the source file
node server.js
```

1️⃣0️⃣ **It's time to have fun, go to localhost:3000**

## 🧪👁️‍🗨️ **As we are good developers, we tried to make unit tests**

```ssh
npm run test
```

## 🏗️ **Developed with**

* [NodeJS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Socket.io](https://socket.io/fr/)
* [Mocha](https://mochajs.org/)


## 💪 **Authors of this project**

* **PERROLLAZ Maverick** _alias_ [@M4verickFr](https://github.com/M4verickFr)
* **CAULLIREAU Dorian** _alias_ [@caullird](https://github.com/caullird)
