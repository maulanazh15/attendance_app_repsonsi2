import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AttendanceService } from '../services/attendance.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: 'attendance-list.page.html',
  styleUrls: ['attendance-list.page.scss'], // Add styles if needed
})
export class AttendanceListPage implements OnInit {
  attendanceList: any[] = []; // Adjust the type according to your data structure

  constructor(
    private attendanceService: AttendanceService,
    private alertController: AlertController,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // Load attendance data when the page initializes
    this.loadAttendanceData();
  }

  private loadAttendanceData() {
    // Assuming you have a method in your AttendanceService to get attendance data
    this.attendanceService.getAttendance().subscribe(
      (data) => {
        // Update the attendanceList with the retrieved data
        this.attendanceList = data;
      },
      (error) => {
        console.error(error);
        // Handle error if needed
      }
    );
  }

  async presentAddAttendanceAlert() {
    const alert = await this.alertController.create({
      header: 'Add Attendance',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'status',
          type: 'text',
          placeholder: 'Status',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: async (formData) => {
            // Add attendance using the service
            await this.attendanceService.addAttendance(formData.name, formData.status).toPromise();
            // Reload the attendance data after adding
            this.loadAttendanceData();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentUpdateAttendanceAlert(id: number, currentStatus: string) {
    const alert = await this.alertController.create({
      header: 'Update Attendance',
      inputs: [
        {
          name: 'status',
          type: 'text',
          value: currentStatus, // Display the current status in the input field
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Update',
          handler: async (formData) => {
            // Update attendance using the service
            await this.attendanceService.updateAttendance(id, formData.status).toPromise();
            // Reload the attendance data after updating
            this.loadAttendanceData();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentDeleteAttendanceConfirm(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this attendance entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            // Delete attendance using the service
            await this.attendanceService.deleteAttendance(id).toPromise();
            // Reload the attendance data after deleting
            this.loadAttendanceData();
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    // Call the logout method from the AuthService
    this.authService.logout();
    // Optionally, you can navigate to the login page or perform other actions after logout
    
  }
}
