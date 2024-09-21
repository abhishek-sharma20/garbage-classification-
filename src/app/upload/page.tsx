'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Upload as UploadIcon, Image as ImageIcon } from 'lucide-react'

export default function Upload() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     if (file) {
    //         // In a real application, you would upload the file to your server here
    //         // For this example, we'll just redirect to the results page
    //         router.push('/result')
    //     }
    // }

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     if (file) {
    //         const formData = new FormData()
    //         formData.append('image', file)
    
    //         try {
    //             const response = await fetch('http://localhost:3000/predict', {
    //                 method: 'POST',
    //                 body: formData,
    //             })
    
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 alert(`Classification Result: ${data.predictedClass}`)
    //                 router.push('/result')  
    //             } else {
    //                 alert('Failed to classify the image')
    //             }
    //         } catch (error) {
    //             console.error('Error:', error)
    //             alert('An error occurred while uploading the file')
    //         }
    //     }
    // }
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     if (file) {
    //         const formData = new FormData()
    //         formData.append('image', file)
    
    //         try {
    //             const response = await fetch('http://localhost:3000/predict', {
    //                 method: 'POST',
    //                 body: formData,
    //             })
    
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 // Instead of alert, we pass the prediction result to the result page
    //                 router.push({
    //                     pathname: '/result',query: { predictedClass: data.predictedClass }, 
    //                 })
    //             } else {
    //                 alert('Failed to classify the image')
    //             }
    //         } catch (error) {
    //             console.error('Error:', error)
    //             alert('An error occurred while uploading the file')
    //         }
    //     }
    // }
    
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await fetch('http://localhost:8080/predict', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const data = await response.json()
                // Navigate to result page with query param
                router.push(`/result?predictedClass=${data.predictedClass}`)
            } else {
                alert('Failed to classify the image')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred while uploading the file')
        }
    }
}


    return (
        <div className="container mx-auto py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Upload Waste Image</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="image" className="text-lg">Waste Image</Label>
                                    <div className="relative h-64 border-2 border-dashed border-input rounded-lg">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                                <p className="mt-2 text-sm text-muted-foreground">Drag and drop or click to select an image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button type="submit" disabled={!file} className="bg-green-500 hover:bg-green-600 text-white">
                                <UploadIcon className="mr-2 h-4 w-4" /> Upload and Analyze
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}