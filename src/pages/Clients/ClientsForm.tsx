import InputComponent from '@/components/formInputs/CustomInput';
import CustomSelect from '@/components/formInputs/CustomSelect';
import Upload from '@/components/formInputs/Upload';
import UploadPdf from '@/components/formInputs/UploadPdf';
import apiServiceCall from '@/lib/apiServiceCall';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ClientsForm = () => {
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
    const customerFields = [
        { name: 'name', placeholder: t('customers.name.placeholder'), type: 'text', fieldType: 'input', label: t('customers.name.label'), required: { required: 'filed req' } },
        { name: 'contactEmail', placeholder: t('customers.contactEmail.placeholder'), type: 'email', fieldType: 'input', label: t('customers.contactEmail.label') },
        { name: 'phone', placeholder: t('customers.phone.placeholder'), type: 'text', fieldType: 'input', label: t('customers.phone.label') },
        { name: 'internationalPhoneNumber', placeholder: t('customers.internationalPhoneNumber.placeholder'), type: 'text', fieldType: 'input', label: t('customers.internationalPhoneNumber.label') },
        { name: 'address', placeholder: t('customers.address.placeholder'), type: 'text', fieldType: 'input', label: t('customers.address.label') },
        {
            name: 'gender',
            placeholder: t('customers.gender.placeholder'),
            fieldType: 'select',
            label: t('customers.gender.label'),
            options: [
                { value: 'MALE', label: t('customers.gender.male') },
                { value: 'FEMALE', label: t('customers.gender.female') },
            ],
        },
        {
            name: 'type',
            placeholder: t('customers.type.placeholder'),
            fieldType: 'select',
            label: t('customers.type.label'),
            options: [
                { value: 'COMPANY', label: t('customers.type.company') },
                { value: 'INDIVIDUAL', label: t('customers.type.individual') },
            ],
        },
        {
            name: 'role',
            placeholder: t('customers.role.placeholder'),
            fieldType: 'select',
            label: t('customers.role.label'),
            options: [
                { value: 'OWNER', label: t('customers.role.owner') },
                { value: 'MANAGER', label: t('customers.role.manager') },
            ],
        },
        { name: 'birthDate', placeholder: t('customers.birthDate.placeholder'), type: 'date', fieldType: 'input', label: t('customers.birthDate.label') },
        { name: 'nationalId', placeholder: t('customers.nationalId.placeholder'), type: 'text', fieldType: 'input', label: t('customers.nationalId.label') },
        { name: 'passportId', placeholder: t('customers.passportId.placeholder'), type: 'text', fieldType: 'input', label: t('customers.passportId.label') },
        { name: 'nationalityId', placeholder: t('customers.nationalityId.placeholder'), type: 'text', fieldType: 'input', label: t('customers.nationalityId.label') },
        { name: 'cityId', placeholder: t('customers.cityId.placeholder'), type: 'text', fieldType: 'select', options: citiesOpions, label: t('customers.cityId.label') },
        { name: 'bank', placeholder: t('customers.bank.placeholder'), type: 'text', fieldType: 'input', label: t('customers.bank.label') },
        { name: 'bankAccount', placeholder: t('customers.bankAccount.placeholder'), type: 'text', fieldType: 'input', label: t('customers.bankAccount.label') },
        { name: 'waterAccount', placeholder: t('customers.waterAccount.placeholder'), type: 'text', fieldType: 'input', label: t('customers.waterAccount.label') },
        { name: 'waterAccountPassword', placeholder: t('customers.waterAccountPassword.placeholder'), type: 'password', fieldType: 'input', label: t('customers.waterAccountPassword.label') },
        { name: 'electricityAccount', placeholder: t('customers.electricityAccount.placeholder'), type: 'text', fieldType: 'input', label: t('customers.electricityAccount.label') },
        { name: 'electricityAccountPassword', placeholder: t('customers.electricityAccountPassword.placeholder'), type: 'password', fieldType: 'input', label: t('customers.electricityAccountPassword.label') },
        { name: 'taxRegistrationNumber', placeholder: t('customers.taxRegistrationNumber.placeholder'), type: 'text', fieldType: 'input', label: t('customers.taxRegistrationNumber.label') },
        { name: 'postalBoxNumber', placeholder: t('customers.postalBoxNumber.placeholder'), type: 'text', fieldType: 'input', label: t('customers.postalBoxNumber.label') },
        { name: 'tradeLicenseNumber', placeholder: t('customers.tradeLicenseNumber.placeholder'), type: 'text', fieldType: 'input', label: t('customers.tradeLicenseNumber.label') },
        { name: 'companyName', placeholder: t('customers.companyName.placeholder'), type: 'text', fieldType: 'input', label: t('customers.companyName.label') },
        { name: 'companyDescription', placeholder: t('customers.companyDescription.placeholder'), type: 'text', fieldType: 'input', label: t('customers.companyDescription.label') },
        { name: 'jobTitle', placeholder: t('customers.jobTitle.placeholder'), type: 'text', fieldType: 'input', label: t('customers.jobTitle.label') },
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
    const onSubmit = async (formData) => {
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
            {customerFields.map((field) => (
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
                        <CustomSelect label={field.label} control={control} options={field.options} name={field.name} placeholder={field.placeholder} />
                    ) : null}
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

export default ClientsForm;
