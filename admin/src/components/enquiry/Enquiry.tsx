import axios from "axios";
import { Layout } from "../custom/layout";
import { useEffect, useState } from "react"
import Loader from "../loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Search } from "../search";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Toast } from "@/components/ui/toast";

export type Enquiry = {
    _id: String;
    fname: string;
    lname: string;
    dob: string;
    dot: string;
    mobile: number;
    gender: string;
    birthPlace: string
    maritalStatus: string;
    reason: string;
    type: string;
    status: string;
}

function Enquiry() {

    const [loading, setLoading] = useState<boolean>(true);
    const [enquiries, setEnquiries] = useState<any>([])

    const [currentEnquiry, setCurrentEnquiry] = useState<string>()

    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false)



    const getAllEnquiries = async () => {
        return await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/enquiry/`).then((response) => {
            setEnquiries(response.data?.result)
            setLoading(false);
        }).catch((error) => {
            console.log("error on getAllEnquiries: ", error);
            setLoading(false);
        })
    }


    useEffect(() => {
        getAllEnquiries();
    }, [loading])



    const handleDelete = async () => {
        return await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/enquiry/delete/${currentEnquiry?._id}`).then((response) => {
            setCurrentEnquiry('')
            setAlertDialogOpen(false)
            getAllEnquiries()
            Toast({ title: "Success", description: "Enquiry deleted successfully.", });
        }).catch((err) => {
            Toast({ title: "Success", description: "Failed to delete enquiry!", });
            console.log("error on handleDelete: ", err);
        })
    }


    return (
        <Layout>
            <Layout.Header className="border border-b">
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>
            <Layout.Body>
                <div className="container mx-auto">
                    <div className="mb-2 flex items-center justify-between space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            List of enquirie's
                        </h1>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>First Name</TableHead>
                                        <TableHead>Last Name</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Mobile Number</TableHead>
                                        <TableHead>Date of Birthe</TableHead>
                                        <TableHead>Birth Time</TableHead>
                                        <TableHead>Marital Status</TableHead>
                                        <TableHead>Birth Place</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {enquiries &&
                                        enquiries?.map((enquiry: Enquiry, ind: number) => (
                                            <TableRow key={ind}>
                                                <TableCell>{enquiry?.fname}</TableCell>
                                                <TableCell>{enquiry?.lname}</TableCell>
                                                <TableCell>{enquiry?.gender}</TableCell>
                                                <TableCell>{enquiry?.mobile}</TableCell>
                                                <TableCell>{enquiry?.dob}</TableCell>
                                                <TableCell>{enquiry?.dot}</TableCell>
                                                <TableCell>{enquiry?.maritalStatus}</TableCell>
                                                <TableCell>{enquiry?.birthPlace}</TableCell>
                                                <TableCell>{enquiry?.reason}</TableCell>
                                                <TableCell>{enquiry?.status}</TableCell>

                                                <TableCell>


                                                    <Button variant="outline" onClick={() => { setCurrentEnquiry(enquiry); setAlertDialogOpen(true); }}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex justify-center">
                                {/* <Pagination className="mt-4">
                                    <PaginationContent>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        />
                                        {[...Array(totalPages)].map((_, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink
                                                    isActive={index + 1 === currentPage}
                                                    onClick={() => handlePageChange(index + 1)}
                                                >
                                                    {index + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationContent>
                                </Pagination> */}
                            </div>
                        </>
                    )}
                </div>

                <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button
                                variant="secondary"
                            /* onClick={() => setAlertDialogOpen(false)} */
                            >
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </Layout.Body>
        </Layout>
    )
}

export default Enquiry