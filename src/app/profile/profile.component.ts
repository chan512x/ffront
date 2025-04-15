import { Component, OnInit } from '@angular/core';
import { FlightBooking ,BookingService} from '../fbook.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  flightBookings: FlightBooking[] = [];
  isLoading = true;
  error: string | null = null;
  // Component properties
activeFilter: 'upcoming' | 'past' = 'upcoming';
allFlightBookings: any[] = []; // Store all bookings here

// Filter function to show upcoming or past flights
filterFlights(filter: 'upcoming' | 'past'): void {
  this.activeFilter = filter;
  
  if (filter === 'upcoming') {
    this.flightBookings = this.allFlightBookings.filter(booking => (booking.UPCOMING==='True'));
  } else {
    this.flightBookings = this.allFlightBookings.filter(booking => !(booking.UPCOMING==='True'));
  }
}

// When loading data from your API

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadFlightBookings();
  }
  cancelFlight(bid:string):void{
    console.log(bid)
    this.bookingService.handleCancel(bid).subscribe({
      next:(yo)=>{
        console.log('done')
        this.ngOnInit()
      }
    })

  }
  loadFlightBookings(): void {
    this.isLoading = true;
    this.bookingService.getUserFlightBookings().subscribe({
        next: (bookings) => {
          this.allFlightBookings = bookings;
          console.log(bookings)
          console.log(bookings[0].BID)
          this.filterFlights('upcoming');
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load your flight bookings. Please try again later.';
          this.isLoading = false;
          console.error('Error fetching bookings:', err);
        }
      });
  }

  // Helper method to format date strings for display
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  // Helper method to get booking type class
  getTypeClass(type: string): string {
    switch(type.toLowerCase()) {
      case 'economy':
        return 'bg-blue-100 text-blue-800';
      case 'business':
        return 'bg-indigo-100 text-indigo-800';
      case 'first class':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}