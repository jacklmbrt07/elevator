class Elevator {
  private requests: number[];
  private currentDirection: 'up' | 'down';
  
  constructor(requests: number[]) {
    this.requests = requests;
    this.currentDirection = 'up';
  }

  private sortRequests(): void {
    this.requests.sort((a, b) => a - b);
  }

  private getNextRequestUp(currentPosition: number | null): number | null {
    const upRequests = this.requests.filter(function(request) {
      return request >= currentPosition;
    });

    if(upRequests.length > 0){
      return Math.min(...upRequests);
    } else {
      return null;
    }
  }

  private getNextRequestDown(currentPosition: number | null): number | null {
    const downRequests = this.requests.filter(function(request) {
      return request <= currentPosition;
    });

    if(downRequests.length > 0){
      return Math.max(...downRequests);
    } else {
      return null;
    }
  }

  private removeRequest(request: number): void {
    const index = this.requests.indexOf(request)
    if (index !== -1){
      this.requests.splice(index, 1);
    }
  }

  public schedule(): number[] {
    this.sortRequests();
    let scheduledRequests: number[] = [];

    let currentPosition: number | null = 0;

    while(this.requests.length > 0){
      var nextRequest: number | null = this.currentDirection == 'up' this.getNextRequestUp(currentPosition) : this.getNextRequestDown(currentPosition)

      if(nextRequest !== null){
        scheduledRequests.push(nextRequest);
        currentPosition = nextRequest;
        this.removeRequest(nextRequest);
      } else {
        if(this.currentDirection == 'up'){
          this.currentDirection = 'down';
        } else {
          this.currentDirection = 'up'
        }
      }
    }

    return scheduledRequests = []
  }
}