import { Component, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ReportsService, Report } from '../reports.service'

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {

  reports = signal<Report[]>([])
  search = signal('')

  showForm = signal(false)

  form = {
    name: '',
    file_path: '',
  }

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.loadReports()
  }

  loadReports() {
    this.reportsService.getReports()
      .subscribe(data => this.reports.set(data))
  }

  openCreate() {
    this.form = { name: '', file_path: '' }
    this.showForm.set(true)
  }

  saveReport() {
    this.reportsService.createReport(this.form)
      .subscribe(() => {
        this.showForm.set(false)
        this.loadReports()
      })
  }

  download(report: Report) {
    window.open(report.file_path, '_blank')
  }


}