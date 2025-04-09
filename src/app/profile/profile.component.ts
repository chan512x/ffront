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

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadFlightBookings();
  }

  loadFlightBookings(): void {
    this.isLoading = true;
    this.bookingService.getUserFlightBookings().subscribe({
        next: (bookings) => {
          this.flightBookings = bookings;
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