# Password Data Parser

A simple web application that extracts structured data from username:password:email:password format into separate columns for easy copying and manipulation.

## Features

- **Text Parsing**: Parses colon-separated data into structured columns
- **Interactive Interface**: Click any cell to copy its content to clipboard
- **Bulk Operations**: Copy all data as CSV or download as CSV file
- **Clean UI**: Modern interface built with shadcn/ui components
- **Real-time Feedback**: Toast notifications for all actions
- **Responsive Design**: Works on desktop and mobile devices

## Usage

1. Paste your data in the input textarea using the format:
   ```
   username:password:email:password
   ```
   
2. Click "Parse Data" to extract the information into columns

3. Click any cell in the table to copy individual values

4. Use "Copy All as CSV" to copy all data in CSV format

5. Use "Download CSV" to save the data as a file

## Example Input

```
john123:pass123:john@email.com:backup456
jane456:secret789:jane@email.com:recovery321
user789:mypass:user@domain.com:altpass
```

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

## Project Status

✅ Password data parsing functionality
✅ Interactive table with copy functionality  
✅ CSV export and download features
✅ Toast notifications
✅ Responsive design
✅ Production build ready