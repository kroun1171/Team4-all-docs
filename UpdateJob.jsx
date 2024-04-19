import { useForm } from 'react-hook-form';
import { useLoaderData, useParams } from 'react-router-dom';
import CreatableSelect from "react-select/creatable"
import { useState } from "react"
const UpdateJob = () => {
    const { id } = useParams();
    const { companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, employmentType,
        description, postedBy, skills } = useLoaderData();
    const [selectedOption, setSelectedOption] = useState(null);
    const {

        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        fetch(`http://localhost:3000/update-job/${id}`, {
            method: "PATCH",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => res.json()).then((result) => {
            console.log(result)
            if (result.acknowledged === true) {
                alert("Job Updated Sucessfully!!!")
            }
            reset()
        })
    };
    const options = [
        { value: "JavaScript", label: "JavaScript" },
        { value: "C++", label: "C++" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "React", label: "React" },
        { value: "Node", label: "Node" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "Redux", label: "Redux" },
    ];
    return (
        <div className='max--screen-2xl container mx-auto xl:px-24 px-4'>

            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/*1st row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Title</label>
                            <input
                                type="text"
                                defaultValue={jobTitle}
                                {...register("jobTitle")}
                                className="create-job-input"
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Name</label>
                            <input
                                placeholder="Ex: Microsoft"
                                defaultValue={companyName}
                                {...register("companyName")}
                                className="create-job-input"
                            />
                        </div>
                    </div>
                    {/*2nd row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Minimum Salary</label>
                            <input
                                type="text"
                                defaultValue={minPrice}
                                placeholder="30k"
                                {...register("minPrice")}
                                className="create-job-input"
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Maximum Salary</label>
                            <input
                                placeholder="100k"
                                defaultValue={maxPrice}
                                {...register("maxPrice")}
                                className="create-job-input"
                            />
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Salary Type</label>
                            <select {...register("salaryType")} className="create-job-input">
                                <option value={salaryType}>{salaryType}</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Location</label>
                            <input
                                placeholder="Ex: Hyderabad"
                                defaultValue={jobLocation}
                                {...register("jobLocation")}
                                className="create-job-input"
                            />
                        </div>
                    </div>

                    {/* 4th row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Posting Date</label>
                            <input
                                className="create-job-input"
                                {...register("postingDate")}
                                defaultValue={postingDate}
                                placeholder="Ex: 2023-11-03"
                                type="date"
                            />
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Experience Level</label>
                            <select
                                {...register("experienceLevel")}
                                className="create-job-input"
                            >
                                <option value={experienceLevel}>{experienceLevel}</option>
                                <option value="NoExperience">No experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                        </div>
                    </div>
                    {/* 5th row */}
                    <div className="">
                        <label className="block mb-2 text-lg">Required Skill Sets:</label>
                        <CreatableSelect
                            className="create-job-input py-4"
                            defaultValue={skills}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                        />
                    </div>
                    {/* 6th row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Logo</label>
                            <input
                                type="url"
                                placeholder="Paste your image url: https://weshare.com/img1.jpg"
                                {...register("companyLogo")}
                                defaultValue={companyLogo}
                                className="create-job-input"
                            />
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Employment Type</label>
                            <select
                                {...register("employmentType")}
                                className="create-job-input"
                            >
                                <option value={employmentType}>{employmentType}</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/* 7th row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Description</label>
                        <textarea
                            className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
                            rows={6}
                            {...register("description")}
                            placeholder="job description"
                            defaultValue={description}
                        />
                    </div>

                    {/* last row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Posted by</label>
                        <input
                            type="email"
                            // value={user?.email}
                            className="w-full pl-3 py-1.5 focus:outline-none"
                            {...register("postedBy")}
                            defaultValue={postedBy}
                            placeholder="your email"
                        />
                    </div>



                    <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2" />
                </form>
            </div>
        </div>
    )
}

export default UpdateJob
