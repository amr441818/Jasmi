import InputComponent from '@/components/formInputs/CustomInput';
import CustomSelect from '@/components/formInputs/CustomSelect';
import { DatePicker } from '@/components/formInputs/DateInput';
import Upload from '@/components/formInputs/Upload';
import UploadPdf from '@/components/formInputs/UploadPdf';
import apiServiceCall from '@/lib/apiServiceCall';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PropertiesForm = () => {
    const navigate = useNavigate();
    const params = useParams()
    const paramId = params.id
    console.log(paramId)
    const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
} = useForm({
    defaultValues: {
        name: '',
        contactEmail: '',
        phone: '',
        internationalPhoneNumber: '',
        address: '',
        gender: '',             // 'MALE' or 'FEMALE'
        type: '',               // 'COMPANY' or 'INDIVIDUAL'
        role: '',               // 'OWNER' or 'MANAGER'
        birthDate: '',          // e.g., '1990-01-01'
        nationalId: '',
        passportId: '',
        nationalityId: '',
        cityId: '',
        bank: '',
        bankAccount: '',
        waterAccount: '',
        waterAccountPassword: '',
        electricityAccount: '',
        electricityAccountPassword: '',
        taxRegistrationNumber: '',
        postalBoxNumber: '',
        tradeLicenseNumber: '',
        companyName: '',
        companyDescription: '',
        jobTitle: '',
    },
});

    const { t } = useTranslation();
    const [citiesOpions, setCitiesOptions] = useState([]);
    const { data, isSuccess } = useQuery({
        queryKey: ['cites'],
        queryFn: () =>
            apiServiceCall({
                url: 'system-settings/cities',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzkyMjhjYS04YWMxLTQ5OTMtYmY4Ni1kMDFhYWU5NWFmYmYiLCJlbWFpbCI6ImFkbWluQGFsamFzbWkuY29tIiwiaWF0IjoxNzQ2MTIwODE3LCJleHAiOjE3NDg3MTI4MTd9.-kstHER7OI-_SHhMcmv2Ph0hlcCbgweYhEneHkdng6w`,
                },
            }),
    });
    const { data:recoredData, isSuccess:recoredIsSuccess } = useQuery({
        queryKey: [`recored${paramId}`],
        queryFn: () =>
            apiServiceCall({
                url: `customers/${paramId}`,
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzkyMjhjYS04YWMxLTQ5OTMtYmY4Ni1kMDFhYWU5NWFmYmYiLCJlbWFpbCI6ImFkbWluQGFsamFzbWkuY29tIiwiaWF0IjoxNzQ2MTIwODE3LCJleHAiOjE3NDg3MTI4MTd9.-kstHER7OI-_SHhMcmv2Ph0hlcCbgweYhEneHkdng6w`,
                },
            }),
            enabled:paramId !== "add"
    });

 useEffect(() => {
    if (isSuccess && recoredData?.data) {
        const raw = recoredData.data;

        reset({
            name: raw.name || '',
            contactEmail: raw.contactEmail || '',
            phone: raw.phone || '',
            internationalPhoneNumber: raw.internationalPhoneNumber || '',
            address: raw.address || '',
            gender: raw.gender || '',
            type: raw.type || '',
            role: raw.role || '',
            birthDate: raw.birthDate?.slice(0, 10) || '', // format for date input
            nationalId: raw.nationalId || '',
            passportId: raw.passportId || '',
            nationalityId: raw.nationalityId || '',
            cityId: raw.cityId || '',
            bank: raw.bank || '',
            bankAccount: raw.bankAccount || '',
            waterAccount: raw.waterAccount || '',
            waterAccountPassword: raw.waterAccountPassword || '',
            electricityAccount: raw.electricityAccount || '',
            electricityAccountPassword: raw.electricityAccountPassword || '',
            taxRegistrationNumber: raw.taxRegistrationNumber || '',
            postalBoxNumber: raw.postalBoxNumber || '',
            tradeLicenseNumber: raw.tradeLicenseNumber || '',
            companyName: raw.companyName || '',
            companyDescription: raw.companyDescription || '',
            jobTitle: raw.jobTitle || '',
        });
    }
}, [isSuccess, recoredData]);

    useEffect(() => {
        if (isSuccess) {
            const cityOptions = data?.data?.map((city: any) => {
                return { value: city.id, label: city.name };
            });
            console.log(data);
            setCitiesOptions(cityOptions);
        }
    }, [isSuccess]);
    // const clientsOpions = [{
    //     value: '1', label: 'Client A'
    // }]
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false)
const propertyFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter property name", fieldType: "input", required: true },
  { name: "number", label: "Number", type: "text", placeholder: "Enter property number", fieldType: "input", required: true },
  {
    name: "type",
    label: "Type",
    fieldType: "select",
    placeholder: "Select type",
    options: [
      { value: "VILLA", label: "Villa" },
      { value: "APARTMENT", label: "Apartment" },
      { value: "COMMERCIAL", label: "Commercial" }
    ],
    required: true
  },
  {
    name: "status",
    label: "Status",
    fieldType: "select",
    placeholder: "Select status",
    options: [
      { value: "NEW", label: "New" },
      { value: "OLD", label: "Old" },
      { value: "RENEWED", label: "Renewed" }
    ],
    required: true
  },
  {
    name: "usageType",
    label: "Usage Type",
    fieldType: "select",
    placeholder: "Select usage type",
    options: [
      { value: "RESIDENTIAL", label: "Residential" },
      { value: "COMMERCIAL", label: "Commercial" },
      { value: "MIXED", label: "Mixed" }
    ],
    required: true
  },
  { name: "area", label: "Area (sqm)", type: "number", placeholder: "Enter area in square meters", fieldType: "input", required: true },
  { name: "street", label: "Street", type: "text", placeholder: "Enter street name", fieldType: "input", required: true },
  { name: "district", label: "District", type: "text", placeholder: "Enter district", fieldType: "input", required: true },
  { name: "nearestLandmark", label: "Nearest Landmark", type: "text", placeholder: "Enter nearest landmark", fieldType: "input", required: false },
  { name: "areaCode", label: "Area Code", type: "text", placeholder: "Enter area code", fieldType: "input", required: false },
  { name: "longitude", label: "Longitude", type: "number", placeholder: "Enter longitude", fieldType: "input", required: false },
  { name: "latitude", label: "Latitude", type: "number", placeholder: "Enter latitude", fieldType: "input", required: false },
  { name: "documentNumber", label: "Document Number", type: "text", placeholder: "Enter document number", fieldType: "input", required: true },
  { name: "documentIssuer", label: "Document Issuer", type: "text", placeholder: "Enter issuer name", fieldType: "input", required: true },
  { name: "taxRegestrationNumber", label: "Tax Registration Number", type: "text", placeholder: "Enter tax registration number", fieldType: "input", required: false },
  { name: "landPartNumber", label: "Land Part Number", type: "text", placeholder: "Enter land part number", fieldType: "input", required: false },
  { name: "spatialNumber", label: "Spatial Number", type: "text", placeholder: "Enter spatial number", fieldType: "input", required: false },
  { name: "plotNumber", label: "Plot Number", type: "text", placeholder: "Enter plot number", fieldType: "input", required: false },
  { name: "floorsCount", label: "Floors Count", type: "number", placeholder: "Enter number of floors", fieldType: "input", required: false },
  { name: "unitsCount", label: "Units Count", type: "number", placeholder: "Enter number of units", fieldType: "input", required: false },
  { name: "parkingCapacity", label: "Parking Capacity", type: "number", placeholder: "Enter parking capacity", fieldType: "input", required: false },
  {
    name: "elevator",
    label: "Elevator",
    fieldType: "select",
    placeholder: "Select elevator availability",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" }
    ],
    required: false
  },
  { name: "constructionCost", label: "Construction Cost", type: "number", placeholder: "Enter construction cost", fieldType: "input", required: false },
  { name: "propertyValue", label: "Property Value", type: "number", placeholder: "Enter property value", fieldType: "input", required: false },
  { name: "managementPercentageFee", label: "Management % Fee", type: "number", placeholder: "Enter management percentage", fieldType: "input", required: false },
  { name: "bankName", label: "Bank Name", type: "text", placeholder: "Enter bank name", fieldType: "input", required: false },
  { name: "bankAccountNumber", label: "Bank Account Number", type: "text", placeholder: "Enter bank account number", fieldType: "input", required: false },
  {
    name: "busyStatus",
    label: "Busy Status",
    fieldType: "select",
    placeholder: "Select status",
    options: [
      { value: "BUSY", label: "Busy" },
      { value: "EMPTY", label: "Empty" }
    ],
    required: false
  },
  {
    name: "acType",
    label: "AC Type",
    fieldType: "select",
    placeholder: "Select AC type",
    options: [
      { value: "CENTRAL", label: "Central" },
      { value: "SPLIT", label: "Split" },
      { value: "WINDOW", label: "Window" }
    ],
    required: false
  },
  {
    name: "cityId",
    label: "City",
    fieldType: "select",
    placeholder: "Select city",
    options: [], // To be populated dynamically
    required: true
  },
  { name: "lastMaintenanceDate", label: "Last Maintenance Date", type: "date", placeholder: "Pick last maintenance date", fieldType: "date", required: false },
  { name: "managmentStartDate", label: "Management Start Date", type: "date", placeholder: "Pick start date", fieldType: "date", required: false },
  { name: "bankAccountOpeningDate", label: "Bank Account Opening Date", type: "date", placeholder: "Pick account opening date", fieldType: "date", required: false },
  { name: "constructionDate", label: "Construction Date", type: "date", placeholder: "Pick construction date", fieldType: "date", required: false },
  { name: "documentDate", label: "Document Date", type: "date", placeholder: "Pick document date", fieldType: "date", required: false },
  {
    name: "customerIdsWithPercentage",
    label: "Customer IDs with Percentage",
    fieldType: "dynamic",
    placeholder: "",
    fields: [
      { name: "customerId", label: "Customer ID", type: "text", placeholder: "Enter customer ID", required: true },
      { name: "percentage", label: "Percentage", type: "number", placeholder: "Enter percentage", required: true }
    ],
    required: false
  }
];




    // const {mutate:getImageUrl} = useMutation({
    //     mutationKey:["images"],

    //     mutationFn: (data)=>apiServiceCall({url:"upload", method:"POST", body:data ,headers:{
    //         'Content-Type':"multipart/form-data",
    //          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzkyMjhjYS04YWMxLTQ5OTMtYmY4Ni1kMDFhYWU5NWFmYmYiLCJlbWFpbCI6ImFkbWluQGFsamFzbWkuY29tIiwiaWF0IjoxNzQ2MTIwODE3LCJleHAiOjE3NDg3MTI4MTd9.-kstHER7OI-_SHhMcmv2Ph0hlcCbgweYhEneHkdng6w`
    //     }}),
    //     onError(error){
    //         toast.error(error?.message)
    //     },
    //     onSuccess(data){
    //         console.log(data)
    //         identityPictureUrl = data[0].relativePath
    //         toast.success(data?.data?.message)
    //     }
    // })

    const { mutate, isPending } = useMutation({
        mutationKey: ['customars'],
        mutationFn: (data) =>
            apiServiceCall({
                url: 'customers',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzkyMjhjYS04YWMxLTQ5OTMtYmY4Ni1kMDFhYWU5NWFmYmYiLCJlbWFpbCI6ImFkbWluQGFsamFzbWkuY29tIiwiaWF0IjoxNzQ2MTIwODE3LCJleHAiOjE3NDg3MTI4MTd9.-kstHER7OI-_SHhMcmv2Ph0hlcCbgweYhEneHkdng6w`,
                },
            }),
        onError(error) {
            setIsLoading(false)
            toast.error(error?.message);
        },
        onSuccess(data) {
            setIsLoading(false)
            toast.success(data?.data?.message);
            navigate('/client');
        },
    });
    //@ts-ignore
    const onSubmit =  async (formData) => {
        try {
            let identityPictureUrl = null;

            if (file) {
                const uploadForm = new FormData();
                uploadForm.append('identityPicture', file); // Rename if backend expects `identityPicture`
                // isPending = true
                setIsLoading(true)
                const uploadResponse = await apiServiceCall({
                    url: 'upload',
                    method: 'POST',
                    body: uploadForm,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzkyMjhjYS04YWMxLTQ5OTMtYmY4Ni1kMDFhYWU5NWFmYmYiLCJlbWFpbCI6ImFkbWluQGFsamFzbWkuY29tIiwiaWF0IjoxNzQ2MTIwODE3LCJleHAiOjE3NDg3MTI4MTd9.-kstHER7OI-_SHhMcmv2Ph0hlcCbgweYhEneHkdng6w`,
                    },
                });
                console.log(uploadResponse);
                //@ts-ignore
                identityPictureUrl = [uploadResponse[0].relativePath] || null;
                const customerPayload = {
                    ...formData,
                    birthDate: new Date(formData.birthDate).toISOString(), // Ensure ISO string
                    identityPicture: identityPictureUrl, // append uploaded image URL or ID
                };

                mutate(customerPayload); // Call customers API
            }

            // Build the full request body
        } catch (err) {
            toast.error('Something went wrong');
        }
    };


    useEffect(()=>{
            if(isLoading){
                toast.loading('Please wait while we process your request',{
                    autoClose: false,
                    toastId:'loadingId'
                    // pauseOnHover: true,
                    // closeButton: true,

                });
            }else{
                toast.dismiss('loadingId');
            }
    },[isLoading])
    // const onSubmit = (data)=>{
    //     console.log(data)
    //     const form  = new FormData()
    //     form.append('identityPicture', file)
    //     getImageUrl(form)
    //     console.log(file)
    // }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {propertyFields.map((field) => (
                <div key={field.name} className="col-span-12 md:col-span-6 lg:col-span-4">
                    {field.fieldType === 'input' ? (
                        <div className="flex flex-col gap-1">
                            <InputComponent
                                validation={field.required && field.required}
                                label={field.label}
                                type={field.type || 'text'}
                                placeholder={field.placeholder}
                                register={register}
                                name={field.name}
                            />
                            <p>{errors[`${field.name}`]?.message}</p>
                        </div>
                    ) : field.fieldType === 'select' ? (
                        //@ts-ignore
                        <CustomSelect label={field.label} control={control} options={field.options} name={field.name} placeholder={field.placeholder} />
                    ) : field.fieldType === 'date'? <div className="flex flex-col ">
                        <label htmlFor="">{field.label}</label>
                        <DatePicker control={control} name={field.name}/>
                    </div> :null}
                </div>
            ))}
            <div className=" flex col-span-12 gap-10 items-center ">
                <Upload multi label="Photo Id" setFile={setFile} />
                {/* <UploadPdf label='Photo Id' setFile={setFile}/> */}
            </div>
            <button type="submit" className="col-span-12 bg-primary text-white py-3  rounded-[12px]">
                Add
            </button>
        </form>
    );
};

export default PropertiesForm;
