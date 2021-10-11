# crosstown-trees

To start the application you need to run two commands

`npm start` in the root of the folder

`node app.js` in the `/server` folder

```
# in one terminal
cd server
node app.js

# in another terminal
npm start
```

Then go to `http://ip.of.device:3000/`


## data structures

### step
* value,integer - index
* value,boolean - active
* value,integer - time (ms)

### channel
* value,integer - number of steps (nSteps)
* array,step - step[nSteps]

### pattern
* value,string - name
* value,string - uuid
* value,integer - nChannels, number of channels
* value,integer - nSteps, number of steps 
* array,channel - channels[nChannels][nSteps]

### song
* value,string - name
* value,string - uuid
* array,pattern - patterns[nPatterns]

### device profile
###