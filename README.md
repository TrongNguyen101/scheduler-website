# Scheduler-Website

## Introduction
### 
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

#### Backend Setup
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
5. **Run the backend server:**
 ```bash
   dotnet run --launch-profile https
   or 
   dotnet watch run --launch-profile https
   ```
#### Backend Setup
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

## Directory Structure for Front-End Web (NextJS 15)
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
- **Note**:
- When using, you must call the function `registerSyncfusionLicense()` in the file:

```
/component/registerLicense.ts

```
- This function will automatically get the key from the environment variable to activate the license.

- **Custom**:
- You can customize the interface and functionality by changing the `props` passed to the component.

---

### 3. Tailwind CSS
- **Purpose of use**: Set up the overall UI for the website (utility-first CSS framework).

- **Configuration**:
- Already configured in the file:

```
/style/global.css

```
- **Reference source**: [Tailwind CSS](https://tailwindcss.com/)


## Directory Structure for Back-End Web (ASP .Net 8)
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
- **Purpose**: contains AutoMapper to map data from DTO and corresponding model
---

### 5. `Migrations/`
- **Purpose**: creates and updates database
---

### 6. `Model/`
- **Purpose**: contains properties of tables
---

### 7. `Repository/`
- **Purpose**: contains CRUD methods (Create, Read, Update, Delete) for tables
---

### 8. `services/`
- **Purpose**: contains service functions and corresponding interfaces
---

### 8. `Program/`
- **Purpose**: contains initialization and configuration methods for the application
---

### 9. `.appsettings.json`
- **Purpose usage**:
Contains environment variables such as:
- `ConnectionStrings`: Syncfusion license key.
- `JWT`: Main API path.
- `AllowedHosts`: Prefix for endpoint.
- Other security configuration variables.



