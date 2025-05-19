# Scheduler-Website

## Introduction
The Timetable Management System is a comprehensive web platform developed to support educational institutions, faculty members, and students in the effective organization, administration, and retrieval of academic schedules. With an intuitive and user-friendly interface, the system facilitates the management of student and teacher information, the allocation of class sessions and teaching assignments, as well as the efficient lookup of timetables. Additionally, it incorporates advanced features aimed at optimizing scheduling workflows to ensure maximum productivity and minimal conflicts.
## Tech Stack
##### The Scheduler-Website is built using the following technologies:
- **Frontend**: React.js
- **Backend**: ASP.NET
- **Database**: SQL Server
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git, GitHub
- **Package Management**: npm (Node Package Manager)

## Setup and Run Guidelines
### Prerequisites
##### Ensure you have the following installed on your system:
- **Node.js**: (v16 or later) and npm
- **.NET SDK**: (v8.0 or later)
- **SQL Server**: (local or remote instance)
- **Git**


## Directory Structure for Back-End Web (ASP.Net Version 8.0)
### 1. `Controllers/`
- **Purpose**: Manage requests and responses from clients and api endpoints

---
### 2. `DataContext/`
- **Purpose**: Configure connection string if not configured from DI (Dependency Injection) and Set up seed data for table.

---

### 3. `DTO`
- **Purpose**: Only pass necessary fields, avoid sending entire entity model.

---

### 4. `Helper/`
- **Purpose**: Contains AutoMapper to map data from DTO and corresponding model
---

### 5. `Migrations/`
- **Purpose**: Creates and updates database
---

### 6. `Model/`
- **Purpose**: Contains properties of tables
---

### 7. `Repository/`
- **Purpose**: Contains methods query database 
---

### 8. `Services/`
- **Purpose**: Contains CRUD methods(create,update,read,delete)
---

### 9. `Program/`
- **Purpose**: Contains initialization and configuration methods for the application
---

### 10. `.appsettings.json`
- **Purpose usage**:
Contains environment variables such as:
- `ConnectionStrings`: Syncfusion license key.
- `JWT`: Main API path.
- `AllowedHosts`: Prefix for endpoint.
- Other security configuration variables.

---

## Back-End Setup
1. **Navigate to the backend directory:** 
 ```bash
   cd back-end/SchedulerAPI
   ```
2. **Restore NuGet packages:**
 ```bash
   dotnet restore
   ```
3. **Update the database connection string in file appsettings.json:**
 ```bash
"ConnectionStrings": {
        "DefaultConnection": "Server=Localhost;Database=SchedulerDB;User Id=sa;Password=Your-Password;Trust Server Certificate=true" 
        }

  ```
4. **Apply database migrations:**
 ```bash
   dotnet ef database update
   ```
5. **Run the backend server HTTPS: (https://localhost:7166/)**
 ```bash
   dotnet run --launch-profile https
   ```
6. **Run the backend server (Swagger) HTTPS: (https://localhost:7166/swagger/index.html)**
 ```bash
   dotnet watch run --launch-profile https
   ```

7. **Run the backend server HTTP: (http://localhost:5133/)**
 ```bash
   dotnet run --launch-profile https
   ```
8. **Run the backend server (Swagger) HTTP: (http://localhost:5133/swagger/index.html)**
 ```bash
   dotnet watch run --launch-profile https
   ```


## Directory Structure for Front-End Web (NextJS Version 15)
### 1. `app/`
- **Description**: NextJS 15 uses the App Router mechanism, so routing is based on folder names.

- **Example**:
`localhost:3000/admin` corresponds to the `/app/admin` folder.

- **Details**:

Each folder will contain:

- `layout.tsx`: Root layout for the page (usually contains components such as `Header`, `Footer`, `Nav`, ... if necessary).

- `page.tsx`: Contains the main UI of the page.

- **Note**:

For simple pages such as `login`, only the `page.tsx` file is needed.

---

### 2. `api/`
- **Description**:
This is where functions are defined to call the API, pass endpoints, data and config to Axios methods.

- **For example**: 
```typescript 
export const createData = async (data: object) => { 
const response = await ExampleAPI.createPosts("posts", data, { 
headers: { 
"Content-Type": "application/json", 
}, 
}); 
console.log(response); 
return response; 
}; 
``` 
- `posts`: Is the endpoint. 
- `data`: Data to be transmitted. 
- `{ headers }`: Additional configuration (eg token, content-type,...).

---

### 3. `component/`
- **Description**:
Contains common components such as:

- `Header`, `Nav`, `Footer`, `Button`, `Modal`, `Alert`, ...

---

### 4. `context/`
- **Description**:
Contains files that manage global state, especially related to authentication and authorization.

- **Examples**:

- `authcontext.tsx`: Handles login status, stores tokens.

- `protectedrouter.tsx`: Checks route access based on user roles.

---

### 5. `hooks/`
- **Description**:
Contains custom hooks that can be reused multiple times in the project.
- **Example**:

- Custom `useEffect`, `useFetch`, `useDebounce`, ...

---

### 6. `lib/`
- **Description**:
Directory for libraries, custom extensions for the project.

---

### 7. `services/`
- **Description**:
Contains functions that handle API call logic, intermediary between the `api` layer and the system.

- **Example**:
```typescript
export const createPosts = async (
path: string,
data: object,
config?: AxiosRequestConfig
) => {
const response = await baseURL.post(path, data, config);
return response.data;
};
```
- The parameters `path`, `data`, `config` will be passed from the functions in the `api` folder when called.

---

### 8. `utils/`
- **Description**:
Contains functions and configurations shared by the entire project.

- **Example**:

`baseURL.ts`: Initialize an instance of Axios.

- `registerLicense.ts`: Function to register the Syncfusion license key before using the component.

---

### 9. `.env`
- **Description**:
Contains environment variables such as:

- `LICENSE_KEY`: Syncfusion license key.

- `API_URL`: Main API path.

- `API_PREFIX`: Prefix for endpoint.

- Other security configuration variables.

## Front-End Web Libraries Documentation

### 1. Material UI (MUI)
- **Purpose of use**: Used for small components such as `Button`, `Alert`, `Icon`, ...
- **Reference source**: [MUI - The React component library you always wanted](https://mui.com/)
- **Install package**:
```bash
npm install @mui/material @emotion/react @emotion/styled
```
- **How ​​to import into the system**:
Example import Icon:
```typescript
import SendIcon from "@mui/icons-material/Send";
```
- **Example**: See the `component/button` folder

---

### 2. Syncfusion
- **Intended use**: Used for large components such as:
- `Chart`
- `Scheduler`
- `Dashboard`
- **Reference**: [Syncfusion UI Components](https://www.syncfusion.com/)
- **License Key**:
- Saved in the project's `.env` file.
- **Install & Import**:
Example import Scheduler:
```typescript
import {
ScheduleComponent,
Week,
WorkWeek,
Month,
Agenda,
Inject,
DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
```
**Note**:
- When using, you must call the function `registerSyncfusionLicense()` in the file

```
/component/registerLicense.ts
```
- This function will automatically get the key from the environment variable to activate the license.

**Custom**:
- You can customize the interface and functionality by changing the `props` passed to the component.

---

### 3. Tailwind CSS
**Purpose of use**: Set up the overall UI for the website (utility-first CSS framework).

**Configuration**:
- Already configured in the file:

```
/style/global.css
```
- **Reference source**: [Tailwind CSS](https://tailwindcss.com/)

## Front-End Setup
1. **Navigate to the frontend directory:** 
 ```bash
   cd front-end
   ```
2. **Install dependencies:**
 ```bash
   npm install --legacy-peer-deps
   ```
3. **Start the development server:**
```bash
   npm run dev
   ```


