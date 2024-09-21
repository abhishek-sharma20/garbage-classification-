// 'use client'

// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { motion } from 'framer-motion'
// import { ArrowLeft, Recycle, Trash2, Info } from 'lucide-react'

// export default function Results() {
//     return (
//         <div className="container mx-auto py-10">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <Card className="max-w-2xl mx-auto">
//                     <CardHeader>
//                         <CardTitle className="text-3xl font-bold text-center">Analysis Results</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg">
//                                 <h3 className="text-xl font-semibold mb-4 flex items-center text-green-800 dark:text-green-100">
//                                     <Recycle className="mr-2" /> Recyclable
//                                 </h3>
//                                 <p className="text-green-700 dark:text-green-200">This item can be recycled. Please place it in the appropriate recycling bin.</p>
//                             </div>
//                             <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
//                                 <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-800 dark:text-blue-100">
//                                     <Info className="mr-2" /> Material
//                                 </h3>
//                                 <p className="text-blue-700 dark:text-blue-200">Material: Plastic (PET)</p>
//                                 <p className="text-blue-700 dark:text-blue-200">Bin Color: Yellow</p>
//                             </div>
//                         </div>
//                         <div className="mt-6 bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg">
//                             <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-800 dark:text-yellow-100">
//                                 <Trash2 className="mr-2" /> Disposal Instructions
//                             </h3>
//                             <ul className="list-disc pl-5 space-y-2 text-yellow-700 dark:text-yellow-200">
//                                 <li>Rinse the item to remove any food residue</li>
//                                 <li>Remove any labels or stickers if possible</li>
//                                 <li>Crush the item to save space in the recycling bin</li>
//                                 <li>Place in the yellow recycling bin for collection</li>
//                             </ul>
//                         </div>
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                         <Button asChild variant="outline">
//                             <Link href="/upload" className="flex items-center">
//                                 <ArrowLeft className="mr-2" /> Upload Another
//                             </Link>
//                         </Button>
//                         <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
//                             <Link href="/">Back to Home</Link>
//                         </Button>
//                     </CardFooter>
//                 </Card>
//             </motion.div>
//         </div>
//     )
// }

'use client'

import { useRouter } from 'next/router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Result() {
    const router = useRouter()
    const { predictedClass } = router.query  
    const handleBackToUpload = () => {
        router.push('/')  
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
                        <CardTitle className="text-2xl font-bold text-center">Prediction Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">Classified as:</h3>
                            <p className="text-3xl font-bold text-green-500 mt-4">{predictedClass}</p>
                            <p className="text-sm text-muted-foreground mt-2">Based on the waste image you uploaded.</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleBackToUpload}>
                            Back to Upload
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
