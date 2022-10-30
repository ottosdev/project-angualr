import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/model/Task';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TasksService } from 'src/app/service/tasks.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'created',
    'actions',
  ];
  taskForm: FormGroup;
  user_id: string;
  taskedit: boolean = false;
  editTask: Task = new Task();
  taskList: Task[];
  dataSource = new MatTableDataSource<Task>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private builder: FormBuilder,
    private localService: LocalstorageService,
    private taskService: TasksService,
    private snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    const local = this.localService.getLocalStorage('id');
    if (local) {
      this.user_id = JSON.parse(local);
    }
    this.createTaskForm();
    this.list();
  }

  onSubmit() {
    console.log(this.taskedit);
    if (!this.taskedit) {
      const newTask: Task = {
        id: uuidv4(),
        task_name: this.taskForm.controls['taskName'].value,
        task_description: this.taskForm.controls['description'].value,
        user_id: this.user_id,
        created_at: new Date().toString(),
      };
      this.taskService.addTask(newTask).subscribe(
        (res) => {
          this.list();
          this.taskForm.reset();
          this.snackService.openSnackBar('Success, Task Created', 'close');
        },
        (err) => {
          this.snackService.openSnackBar(
            'Something wrong happened! Please contact the support',
            'close'
          );
        }
      );
    } else {
      const task: Task = {
        ...this.editTask,
        task_name: this.taskForm.controls['taskName'].value,
        task_description: this.taskForm.controls['description'].value,
      };

      this.taskService.edit(this.editTask.id, task).subscribe(
        (res) => {
          this.list();
          this.taskForm.reset();
          this.snackService.openSnackBar('Success, Edit Task', 'close');
        },
        (err) => {
          this.snackService.openSnackBar(
            'Something wrong happened! Please contact the support',
            'close'
          );
        }
      );
    }
  }

  list() {
    this.taskService.getAllTasks().subscribe(
      (res) => {
        this.taskList = res.filter((item) => item.user_id === this.user_id);
        this.dataSource = new MatTableDataSource<Task>(this.taskList);
      },
      (err) => {
        this.snackService.openSnackBar(
          'Error! Refresh and check again',
          'close'
        );
      }
    );
  }

  delete(id: string) {
    this.taskService.delete(id).subscribe(() => {
      this.list();
    });
  }

  edit(id: string) {
    this.taskedit = true;
    const task = this.taskList.find((item) => item.id === id);
    if (task) {
      this.editTask = task;
      this.createTaskForm(this.editTask);
    }
  }

  createTaskForm(task?: Task) {
    this.taskForm = this.builder.group({
      taskName: [this.taskedit ? task?.task_name : null, Validators.required],
      description: [
        this.taskedit ? task?.task_description : null,
        Validators.required,
      ],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
