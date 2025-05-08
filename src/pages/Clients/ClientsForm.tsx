import InputComponent from '@/components/formInputs/CustomInput';
import CustomSelect from '@/components/formInputs/CustomSelect';
import Upload from '@/components/formInputs/Upload';
import UploadPdf from '@/components/formInputs/UploadPdf';
import apiServiceCall from '@/lib/apiServiceCall';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ClientsForm = () => {
    const navigate = useNavigate();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
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
    const customerFields = [
        { name: 'name', placeholder: t('name.placeholder'), type: 'text', fieldType: 'input', label: t('name.label'), required: { required: 'filed req' } },
        { name: 'contactEmail', placeholder: t('contactEmail.placeholder'), type: 'email', fieldType: 'input', label: t('contactEmail.label') },
        { name: 'phone', placeholder: t('phone.placeholder'), type: 'text', fieldType: 'input', label: t('phone.label') },
        { name: 'internationalPhoneNumber', placeholder: t('internationalPhoneNumber.placeholder'), type: 'text', fieldType: 'input', label: t('internationalPhoneNumber.label') },
        { name: 'address', placeholder: t('address.placeholder'), type: 'text', fieldType: 'input', label: t('address.label') },
        {
            name: 'gender',
            placeholder: t('gender.placeholder'),
            fieldType: 'select',
            label: t('gender.label'),
            options: [
                { value: 'MALE', label: t('gender.male') },
                { value: 'FEMALE', label: t('gender.female') },
            ],
        },
        {
            name: 'type',
            placeholder: t('type.placeholder'),
            fieldType: 'select',
            label: t('type.label'),
            options: [
                { value: 'COMPANY', label: t('type.company') },
                { value: 'INDIVIDUAL', label: t('type.individual') },
            ],
        },
        {
            name: 'role',
            placeholder: t('role.placeholder'),
            fieldType: 'select',
            label: t('role.label'),
            options: [
                { value: 'OWNER', label: t('role.owner') },
                { value: 'MANAGER', label: t('role.manager') },
            ],
        },
        { name: 'birthDate', placeholder: t('birthDate.placeholder'), type: 'date', fieldType: 'input', label: t('birthDate.label') },
        { name: 'nationalId', placeholder: t('nationalId.placeholder'), type: 'text', fieldType: 'input', label: t('nationalId.label') },
        { name: 'passportId', placeholder: t('passportId.placeholder'), type: 'text', fieldType: 'input', label: t('passportId.label') },
        { name: 'nationalityId', placeholder: t('nationalityId.placeholder'), type: 'text', fieldType: 'input', label: t('nationalityId.label') },
        { name: 'cityId', placeholder: t('cityId.placeholder'), type: 'text', fieldType: 'select', options: citiesOpions, label: t('cityId.label') },
        { name: 'bank', placeholder: t('bank.placeholder'), type: 'text', fieldType: 'input', label: t('bank.label') },
        { name: 'bankAccount', placeholder: t('bankAccount.placeholder'), type: 'text', fieldType: 'input', label: t('bankAccount.label') },
        { name: 'waterAccount', placeholder: t('waterAccount.placeholder'), type: 'text', fieldType: 'input', label: t('waterAccount.label') },
        { name: 'waterAccountPassword', placeholder: t('waterAccountPassword.placeholder'), type: 'password', fieldType: 'input', label: t('waterAccountPassword.label') },
        { name: 'electricityAccount', placeholder: t('electricityAccount.placeholder'), type: 'text', fieldType: 'input', label: t('electricityAccount.label') },
        { name: 'electricityAccountPassword', placeholder: t('electricityAccountPassword.placeholder'), type: 'password', fieldType: 'input', label: t('electricityAccountPassword.label') },
        { name: 'taxRegistrationNumber', placeholder: t('taxRegistrationNumber.placeholder'), type: 'text', fieldType: 'input', label: t('taxRegistrationNumber.label') },
        { name: 'postalBoxNumber', placeholder: t('postalBoxNumber.placeholder'), type: 'text', fieldType: 'input', label: t('postalBoxNumber.label') },
        { name: 'tradeLicenseNumber', placeholder: t('tradeLicenseNumber.placeholder'), type: 'text', fieldType: 'input', label: t('tradeLicenseNumber.label') },
        { name: 'companyName', placeholder: t('companyName.placeholder'), type: 'text', fieldType: 'input', label: t('companyName.label') },
        { name: 'companyDescription', placeholder: t('companyDescription.placeholder'), type: 'text', fieldType: 'input', label: t('companyDescription.label') },
        { name: 'jobTitle', placeholder: t('jobTitle.placeholder'), type: 'text', fieldType: 'input', label: t('jobTitle.label') },
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
            toast.error(error?.message);
        },
        onSuccess(data) {
            toast.success(data?.data?.message);
            navigate('/client');
        },
    });
    const onSubmit = async (formData) => {
        try {
            let identityPictureUrl = null;

            if (file) {
                const uploadForm = new FormData();
                uploadForm.append('identityPicture', file); // Rename if backend expects `identityPicture`

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
            <button type="submit" className="col-span-12 bg-primary text-white py-2 rounded">
                Add
            </button>
        </form>
    );
};

export default ClientsForm;
