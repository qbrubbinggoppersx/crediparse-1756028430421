"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ParsedData {
  username: string;
  password1: string;
  email: string;
  password2: string;
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);

  const parseData = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to parse.",
        variant: "destructive"
      });
      return;
    }

    const lines = inputText.trim().split('\n');
    const parsed: ParsedData[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(':');
      if (parts.length >= 4) {
        parsed.push({
          username: parts[0].trim(),
          password1: parts[1].trim(),
          email: parts[2].trim(),
          password2: parts[3].trim()
        });
      } else if (parts.length > 0) {
        // Handle incomplete entries
        parsed.push({
          username: parts[0]?.trim() || '',
          password1: parts[1]?.trim() || '',
          email: parts[2]?.trim() || '',
          password2: parts[3]?.trim() || ''
        });
      }
    });

    setParsedData(parsed);
    
    if (parsed.length > 0) {
      toast({
        title: "Success",
        description: `Parsed ${parsed.length} entries successfully.`
      });
    } else {
      toast({
        title: "Warning",
        description: "No valid entries found. Expected format: username:password:email:password",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${field} copied to clipboard.`
    });
  };

  const copyAllData = () => {
    const csvData = parsedData.map(row => 
      `"${row.username}","${row.password1}","${row.email}","${row.password2}"`
    ).join('\n');
    
    const header = '"Username","Password","Email","Password2"';
    const fullCsv = header + '\n' + csvData;
    
    navigator.clipboard.writeText(fullCsv);
    toast({
      title: "Copied",
      description: "All data copied as CSV format."
    });
  };

  const downloadCsv = () => {
    const csvData = parsedData.map(row => 
      `"${row.username}","${row.password1}","${row.email}","${row.password2}"`
    ).join('\n');
    
    const header = '"Username","Password","Email","Password2"';
    const fullCsv = header + '\n' + csvData;
    
    const blob = new Blob([fullCsv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parsed_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Data downloaded as CSV file."
    });
  };

  const clearData = () => {
    setInputText('');
    setParsedData([]);
    toast({
      title: "Cleared",
      description: "All data has been cleared."
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Password Data Parser</h1>
        <p className="text-muted-foreground">
          Extract username:password:email:password into separate columns for easy copying
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Data</CardTitle>
            <CardDescription>
              Paste your data in format: username:password:email:password (one entry per line)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Example:&#10;john123:pass123:john@email.com:backup456&#10;jane456:secret789:jane@email.com:recovery321"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={parseData} className="flex-1">
                Parse Data
              </Button>
              <Button onClick={clearData} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parsed Results</CardTitle>
            <CardDescription>
              {parsedData.length > 0 
                ? `${parsedData.length} entries parsed successfully` 
                : "No data parsed yet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {parsedData.length > 0 && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={copyAllData} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All as CSV
                  </Button>
                  <Button onClick={downloadCsv} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Click on any cell to copy its content
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {parsedData.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Extracted Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password 2</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell 
                        className="cursor-pointer hover:bg-muted/50 font-mono text-sm"
                        onClick={() => copyToClipboard(row.username, 'Username')}
                      >
                        {row.username}
                      </TableCell>
                      <TableCell 
                        className="cursor-pointer hover:bg-muted/50 font-mono text-sm"
                        onClick={() => copyToClipboard(row.password1, 'Password')}
                      >
                        {row.password1}
                      </TableCell>
                      <TableCell 
                        className="cursor-pointer hover:bg-muted/50 font-mono text-sm"
                        onClick={() => copyToClipboard(row.email, 'Email')}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell 
                        className="cursor-pointer hover:bg-muted/50 font-mono text-sm"
                        onClick={() => copyToClipboard(row.password2, 'Password 2')}
                      >
                        {row.password2}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
