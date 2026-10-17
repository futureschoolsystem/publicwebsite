# Future School Management System

A modern school management system built with Next.js for student, teacher, and admin portals. It combines a clean public website with secure role-based portals for attendance, fee records, academic resources, notices, file uploads, and content publishing.

## High Level Overview

Future School Management System is designed for small and mid-sized schools that need a web platform to manage student services, teacher uploads, and administrator controls.

- Student portal for self-service academic and attendance information
- Teacher portal for uploading notices, downloads, lectures, syllabi, timetables, and daily diary content
- Admin portal for daily login tracking, gallery/banner management, date sheet and result publish permissions
- Cloudinary file management for images, PDFs, videos, and raw downloads
- Role-based access using `next-auth` and middleware protection

## Core Features

### Student Portal
- Personal information dashboard
- Fee records and printable fee voucher generation
- Attendance overview and monthly attendance tracking
- Academic records summary
- Daily diary / announcements access
- Online lectures and downloadable resources
- Date sheet, class timetable, and syllabus access
- Notices and announcements by class/campus/section
- Secure login using registration number + contact

### Teacher Portal
- Upload notices, daily diary entries, downloads, online lectures, date sheets, timetables, and syllabus files
- Cloudinary upload support for media and documents
- Filtering by campus, class, section, and content type
- Delete and manage published content

### Admin Portal
- Add and manage gallery photos
- Update the public main page banner
- View daily student login details by date
- Configure result publish permissions
- Configure date sheet publish permissions

### Public Site
- Home page, about, academics, admission info, gallery, contact pages
- Responsive public landing pages with modern UI components
- Contact form with email delivery via Resend API

## Technology Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS + daisyUI
- NextAuth.js with credential authentication
- MongoDB + Mongoose for data storage
- Cloudinary for file storage and protected downloads
- Resend for contact email handling
- Axios for client-server requests

## Environment Variables

Create a `.env.local` file and provide:

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`

> Note: Teacher file uploads use Cloudinary with an unsigned preset named `notice_upload` in the current implementation.

## Setup & Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to use the application.

## Why This System

- Designed for quick school deployment with multiple user roles
- Built-in content publishing and file management
- Secure routing and role enforcement using middleware
- Optimized for responsive desktop and mobile portals
- Includes both public marketing pages and internal school workflows

## Project Structure

- `src/app/`: public pages, login, and authenticated portals
- `src/components/`: UI components, portal layout, and role-specific modules
- `src/models/`: Mongoose schemas for users, notices, attendance, fees, gallery, and permissions
- `src/app/api/`: API routes for auth, student data, teacher uploads, admin management, and contact handling
- `src/config/`: Cloudinary configuration
- `src/lib/`: MongoDB connection utility

## Ready for Deployment

This project is production-ready and can be deployed to Vercel, Netlify, or any platform that supports Next.js. It is built with modern tools for fast performance and scalable school operations.
