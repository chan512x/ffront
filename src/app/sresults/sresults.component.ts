import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetresService } from '../getres.service';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
@Component({
  selector: 'app-sresults',
  imports: [FormsModule,CommonModule,RouterOutlet],
  templateUrl: './sresults.component.html',
  styleUrl: './sresults.component.css'
})
export class SresultsComponent {
  private sd:'asc'|'desc'='asc';
  private lsk:string|null=null
  results:any[]=[]
  fro:string=''
  to:string=''
  date:string=''
  isDropdownOpen:boolean=false
  popupStates:{[key:number]:boolean}={};
  tairlines:{[key:string]:number}={};
  sairlines=new Set<string>;
  selectedFlight: any = null
  popupStates1: boolean[] = [];
  tdur1:{[key:string]:number}={};
  tdur2:{[key:string]:number}={};
  tact1:{[key:number]:string}={};
  tact2:{[key:number]:string}={};
  sdur1=new Set<string>;
  isLoading:boolean=false;
  sdur2=new Set<string>;
  sortBy:string ='price'
  constructor(private getresService:GetresService,private route:ActivatedRoute,private bookingService:BookingService){}
  ngOnInit():void{
    this.route.queryParams.subscribe(params=>{
      this.fro=params['from']||''
      this.to=params['to']||'';
      this.date=params['date']||''
      this.isLoading=true;
      setTimeout(() => {
        this.getres()
        this.isLoading=false;
      }, 1500);
    })
  }
  selectedWebsite: string = 'default';

// Add these methods to your component class
updateSelectedPrice(): void {
  // This will update the price when a different website is selected 
  // The calculateTotal and calculateConvenienceFee methods will use this
  this.calculateTotal();
}

getCurrentPrice(): number {
  switch(this.selectedWebsite) {
    case 'air_irctc':
      return this.selectedFlight.ai_price || this.selectedFlight.price;
    case 'easemytrip':
      return this.selectedFlight.emt_price || this.selectedFlight.price;
    case 'magic_fares':
      return this.selectedFlight.mf_price || this.selectedFlight.price;
    default:
      return this.selectedFlight.price;
  }
}

calculateConvenienceFee(): number {
  // Only apply convenience fee for SkyScaper bookings
  if (1) {
    return Math.round(this.getCurrentPrice() * 0.1);
  }
  return 0;
}

calculateTotal(): number {
  return this.getCurrentPrice() + this.calculateConvenienceFee();
}

getWebsiteName(): string {
  switch(this.selectedWebsite) {
    case 'air_irctc':
      return 'Air_Irctc';
    case 'easemytrip':
      return 'Easemytrip';
    case 'magic_fares':
      return 'Magic Fares';
    default:
      return 'SkyScaper';
  }
}

// Modify the confirm booking method to handle different websites

  handleLogout(){
    console.log("logout")
    localStorage.setItem('token',"");
  }
  selectFlight(flight: any) {
    this.selectedFlight = flight;
    // You might want to scroll to top
    window.scrollTo(0, 0);
    // Optional: prevent body scrolling while overlay is open
    document.body.style.overflow = 'hidden';
  }
  
  // Close the flight details overlay
  closeFlightDetails() {
    this.selectedFlight = null;
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  }
  
  // Confirm booking method
  confirmBooking() {
    // Add your booking logic here
    console.log('Booking confirmed for:', this.selectedFlight);
    // You would typically navigate to a payment page or show a confirmation
    this.selectedFlight.price=this.calculateTotal()
    console.log(this.selectedFlight.price);
    alert('Booking confirmed! Total amount: ₹' + this.calculateTotal());
    this.bookingService.book(this.selectedFlight,this.calculateTotal()).subscribe((data)=>{
      console.log(data)

    })
    this.closeFlightDetails();
  }
  showPopup1(index: number) {
    this.popupStates1[index] = true;  
  }
  
  hidePopup1(index: number) {
    this.popupStates1[index] = false;
  }
  sortRes(key: string)
  {
    this.sortBy=key
    if(this.lsk===key)
    {
      this.sd=this.sd==='asc'?'desc':'asc'
    }else{
      this.sd='asc'
      this.lsk=key
    }
    const sresu=[...this.results].sort((a,b)=>{
      let vala:any, valb:any
      switch(key){
        case'price':
        vala=a.price
        valb=b.price
        break
        case 'duration':
          vala=this.convdtomin(a.duration)
          valb=this.convdtomin(b.duration)
          break
        default:
          vala=a[key]
          valb=b[key]
      }
      if(this.sd==='asc')
      {
        return vala>valb?1:vala<valb?-1:0
      }
      else
      {
        return vala<valb?1:vala>valb?-1:0
      }
    });
    this.results=sresu
  }
    private convdtomin(dur:string):number{
      if (1){
        let v="",v1="", index = 0;
        for (; index < dur.length; index++) {
          if(dur[index]!='h')
          {
            v+=dur[index];
          }
          else
          break;
        }
        index+=2;
        for (; index < dur.length; index++) {
          if(dur[index] !='m')
          {
            v1+=dur[index];
          }
          else
          break;
        }
        console.log(v+" "+v1)
        return parseInt(v)*60+parseInt(v1);
      } 
      return 0
    }
    onSubmit(){ 
      this.isLoading=true;
      setTimeout(() => {
        this.getres()
        this.isLoading=false;
      }, 1500);
    }
    onCheckBoxChange(value:string, event:Event){
      const checked=(event.target as HTMLInputElement).checked;
      if(checked)
      {
        this.sairlines.add(value)
      }
      else
      {
        this.sairlines.delete(value)
      }
      console.log(this.sairlines)
    }
    onCheckBoxChange1(value:string, event:Event){
      const checked=(event.target as HTMLInputElement).checked;
      if(checked)
      {
        this.sdur1.add(value)
      }
      else
      {
        this.sdur1.delete(value)
      }
      console.log(this.sdur1)
    }
    onCheckBoxChange2(value:string, event:Event){
      const checked=(event.target as HTMLInputElement).checked;
      if(checked)
      {
        this.sdur2.add(value)
      }
      else
      {
        this.sdur2.delete(value)
      }
      console.log(this.sdur2)
    }
    ischecked(value:string):boolean{
      return this.sairlines.has(value);
    }
    ischecked1(value:string):boolean{
          return this.sdur1.has(value);
    }
    ischecked2(value:string):boolean{
      return this.sdur2.has(value);
}
   getres(){
      if(this.fro && this.to && this.date)
      {
        this.getresService.getRes(this.fro,this.to,this.date).subscribe((data)=>{
          console.log(data)
          this.results=data
          data.forEach((_,index)=>{
            this.popupStates[index]=false;
            this.tairlines[_.airline]=0;
            const te=Number(_.dept_time[0]+_.dept_time[1]) //_.dept_time[0]+_.dept_time[1]
            if(te<=5)
              {
                this.tdur1['1']=0;
                this.sdur1.add('1')
              }
              else if(te<=11)
              {
                this.tdur1['2']=0;
                this.sdur1.add('2')
              }
              else if(te<=17)
                {
                  this.tdur1['3']=0;
                  this.sdur1.add('3')
                }
                else
                {
                  this.tdur1['4']=0;
                  this.sdur1.add('4')
                }
                const te1=Number(_.arriv_time[0]+_.arriv_time[1])
                if(te1<=5)
              {
                this.tdur2['1']=0;
                this.sdur2.add('1')
              }
              else if(te1<=11)
              {
                this.tdur2['2']=0;
                this.sdur2.add('2')
              }
              else if(te1<=17)
             {
                  this.tdur2['3']=0;
                  this.sdur2.add('3')
                }
                else
                {
                  this.tdur2['4']=0;
                  this.sdur2.add('4')
                }
          })
          data.forEach((_,index)=>{

            this.tairlines[_.airline]+=1;

            this.sairlines.add(_.airline)

            const te=Number(_.dept_time[0]+_.dept_time[1]) //_.dept_time[0]+_.dept_time[1]

            if(te<=5)

            {

              this.tdur1['1']++;

              this.tact1[index]='1';

            }

            else if(te<=11)

            {

              this.tdur1['2']++;

              this.tact1[index]='2';

            }

            else if(te<=17)

              {

                this.tdur1['3']++;

                this.tact1[index]='3';

              }

              else

              {

                this.tdur1['4']++;

                this.tact1[index]='4';

              }

            const te1=Number(_.arriv_time[0]+_.arriv_time[1])

            if(te1<=5)

            {

              this.tdur2['1']++;

              this.tact2[index]='1';

            }

            else if(te1<=11)

            {

              this.tdur2['2']++;

              this.tact2[index]='2';

            }

            else if(te1<=17)

              {

                this.tdur2['3']++;

                this.tact2[index]='3';

              }

              else

              {

                this.tdur2['4']++;

                this.tact2[index]='4';

              }

          })

          console.log(this.tdur1)



        })



      }

    }

    showPopup(index:number){

      this.popupStates[index]=true;

    }

    hidePopup(index:number){

      this.popupStates[index]=false;

    }









}
