# crosstown-trees

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