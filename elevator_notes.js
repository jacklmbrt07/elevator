// uses the LOOK algorithm
// meaning, uses a first come first serve method, but only in the direction its moving (SCAN). but once it gets to the outermost request, it switches direction. (SCAN switches direction when its at the top or bottom floor)
class Elevator {
  // write the constructor
  constructor(requests) {
    this.requests = requests;
    this.currentDirection = 'up'; // 'up' | 'down', 
  }

  // function to sort the requests
  sortRequests() {
    this.requests.sort((a, b) => a -b);
  }

  // return its current schedule
  schedule() {
    // sort once
    this.sortRequests();
    // init empty array which we will push to and return, this is the order of floors the elevator will move to
    let scheduledRequests = [];
    // init current position
    let currentPosition = 0;

    while(this.requests.length > 0){
      const nextRequest = this.currentDirection == 'up' ? this.getNextRequestUp(currentPosition) : this.getNextRequestDown(currentposition)

      if(nextRequest !== null) {
        // elevator adds closest request floor to its queue
        scheduledRequests.push(nextRequest)
        // elevator moves to that floor
        currentPosition = nextRequest;
        // elevator door opens, picks up passengers, removes request from queue
        this.removeRequest(nextRequest);
      } else { // if all requests are cleared, elevator switches directions
        this.currentDirection == 'up' ? this.currentDirection = 'down' : this.currentDirection = 'up';
      }
      // elevator begins search and move again
    }

    return scheduledRequests
  }

  getNextRequestUp(currentPosition) {
    // find all the requests that are Higher than current elevator level
    const upRequests = this.requests.filter((request) => request >= currentPosition)
    // chose the closest one, or return null if there are none
    if(upRequests.length > 0){
      return Math.min(...upRequests)
    } else {
      return null
    }
  }
  
  getNextRequestDown(currentPosition) {
    // find all the requests that are Lower than current elevator level
    const downRequests = this.requests.filter((request) => request <= currentPosition)
    // chose the closest one, or return null if there are none
    if(downRequests.length > 0) {
      return Math.max(...downRequests)
    } else {
      return null
    }
  }
  
  removeRequest(request) {
    // find the index of the input in the requests array
    const index = this.requests.indexOf(request)
    // remove from requests array if it exists.
    if(index !== -1){
      this.requests.splice(index, 1);
    }
  }
};

//Examples
// passenger requests are added to requests array chronologically
// requests from both inside and outside the elevator are considered the same. 
const elevatorScheduler = new Elevator([98, 183, 37, 122, 14, 124, 65, 67]);
const scheduledRequests = diskScheduler.schedule();
console.log(scheduledRequests);