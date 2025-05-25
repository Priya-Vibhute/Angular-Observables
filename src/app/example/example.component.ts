import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, delay, filter, from, interval, map, merge, mergeAll, mergeMap, Observable, of, retry, switchAll, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-example',
  imports: [CommonModule,AsyncPipe],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {

  data: any[] = [];

  observable = new Observable((observer) => {
    setTimeout(() => { observer.next(12); }, 1000)
    setTimeout(() => { observer.next(14); }, 2000)
    setTimeout(() => { observer.next(16); }, 3000)
    setTimeout(() => { observer.error(new Error("Something went wrong"))}, 3500);
    setTimeout(() => { observer.next(12); }, 4000)
    setTimeout(() => { observer.next(14); }, 5000)

    setTimeout(() => { observer.complete() }, 6000)



  })

  getData1() {
    this.observable.subscribe({
      next: (value) => {
        console.log("Value is", value);
        this.data.push(value);
      },
      complete: () => { alert("Data emission completed") },
      error:(error)=>{ alert(error.message)}
    })
  }


  getData2()
  {
    let observable2=of([12,67],45,90,"A");
    observable2.subscribe({
      next:(value)=>{this.data.push(value)},
      complete:()=>{}
    })
  }


  getData3()
  {
    from(["Nisha","Anisha","Om"])
    .subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }

  getData4()
  {
    interval(500)
    .subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }

  getData5()
  {
    merge(of(12,67,78,100),from("Hello"))
    .subscribe({
      next:(value)=>this.data.push(value)
    })
  }

  getData6()
  {
    from([12,56,34,45,19,23,78])
    .pipe(
      take(1)
    ).subscribe({
      next:(value)=>this.data.push(value)
    })

  }

  getData7()
  {
    of(12,56,67,101,104,67,90,33)
    .pipe(
      map((n)=>n*n),
      take(4)
    ).subscribe({
      next:(value)=>this.data.push(value)
    })
  }


  getData8()
  {
    of(12,56,67,101,104,67,90,33)
    .pipe(
      filter(value=>value>100),
      map(x=>x*x)
    ).subscribe({
      next:(value)=>this.data.push(value)
    })
  }

  observable2= interval(1000)
  unSubscribeObservable2:any;

  getData9()
  {
 
     this.unSubscribeObservable2=this.observable2.pipe(map(x=>x+1))
     .subscribe({
      next:(value)=>this.data.push(value)
     })

  }


  stop()
  {
     this.unSubscribeObservable2.unsubscribe();
  }


  getData10()
  {
    of(12,67,89,45)
    .pipe(
      mergeMap(x=>of(x))  
    ).subscribe({
      next:(value)=>{console.log(value)}
    })
  }

  getData11()
  {
    of(12,56,78,45)
    .pipe(
      delay(3000)
    ).subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }

  getData12()
  {
     of(12,56,78,45)
     .pipe(
      switchMap(x=>of(x).pipe(delay(3000))) 
     ).subscribe({
      next:(value)=>this.data.push(value)
     })

  }

  getData13()
  {
    interval(500)
    .pipe(
      map((x)=>{
        if(x==3)
        {
          throw new Error("Value is equal to 3")
        }
        return  x;
      }),
      retry(2),
      catchError((error)=>{

        console.log(error.message);
        return of("A","B","C")

      })
    ).subscribe({
      next:(value)=>this.data.push(value)
    })
  }


  getData14()
  {
    of(12,56,78,56,324)
    .pipe(
      map(x=>of(x))
    ).subscribe({
      next:(value)=>this.data.push(value)
    })
  }








}
