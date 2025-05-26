import { useState } from 'react';
import axios from 'axios';

export default function ExperimentPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [trueLabel, setTrueLabel] = useState('');
    const [nqueries, setNqueries] = useState(10000);
    const [mode, setMode] = useState('ideal');

    const urlToFile = async (url, filename, mimeType) => {
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();
        return new File([buffer], filename, { type: mimeType });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewURL(URL.createObjectURL(file));
            setPrediction('');
        }
    };

    const handlePredict = async () => {
        if (!selectedFile) return;

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('http://localhost:8000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setPrediction(response.data);
        } catch (error) {
            console.error('Prediction error:', error);
        }
    };

    const handleChangeNqueries = () => {
        const newVal = parseInt(prompt('Nhập giá trị mới cho số lượng queries:', nqueries), 10);
        if (!isNaN(newVal)) {
            setNqueries(newVal);
        } else {
            alert('Giá trị không hợp lệ.');
        }
    };

    const handleToggleMode = () => {
        setMode(prevMode => (prevMode === 'ideal' ? 'real' : 'ideal'));
    };

    const handleAttack = async () => {
        if (!selectedFile || !trueLabel) return;

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('true_label', trueLabel);
            formData.append('n_queries', nqueries);
            formData.append('mode', mode);

            const response = await axios.post('http://localhost:8000/attack', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const advURL = response.data;
            const advFile = await urlToFile(advURL, 'adversarial.png', 'image/png');
            setSelectedFile(advFile);
            setPreviewURL(URL.createObjectURL(advFile));
            setPrediction('');
            await handlePredict();
        } catch (error) {
            console.error('Attack error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Traffic Sign Classifier
                </h1>

                <p className="text-center text-sm text-gray-600">
                    Upload an image of a traffic sign.<br />
                    Supported classes:
                    <br />
                    0: Speed Limit 5 km/h,
                    1: Speed Limit 15 km/h,
                    2: Speed Limit 30 km/h,
                    3: Speed Limit 40 km/h,
                    4: Speed Limit 50 km/h,
                    5: Speed Limit 60 km/h,
                    6: Speed Limit 70 km/h,
                    7: Speed Limit 80 km/h,
                    8: No Car Allowed.
                </p>

                <div className="space-y-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />

                    {previewURL && (
                        <div className="flex flex-col items-center">
                            <img
                                src={previewURL}
                                alt="Preview"
                                className="mt-4 rounded-xl max-h-52 border border-gray-300 object-contain"
                            />
                            <button
                                onClick={handlePredict}
                                 className="btn btn-accent w-full mt-3"
                            >
                                Predict
                            </button>
                        </div>
                    )}

                    {prediction && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <h2 className="text-lg font-semibold text-gray-700">Prediction</h2>
                                <p className="text-blue-600 font-medium">{prediction}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    True Label
                                </label>
                                <input
                                    type="number"
                                    value={trueLabel}
                                    onChange={(e) => setTrueLabel(e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="text-sm text-gray-700 space-y-1">
                                <p>
                                    <span className="font-medium">Number of queries:</span> {nqueries}
                                    <button
                                        onClick={handleChangeNqueries}
                                        className="ml-2 text-blue-600 hover:underline"
                                    >
                                        Change
                                    </button>
                                </p>

                                <p>
                                    <span className="font-medium">Mode:</span> {mode}
                                    <button
                                        onClick={handleToggleMode}
                                        className="ml-2 text-blue-600 hover:underline"
                                    >
                                        Switch to {mode === 'ideal' ? 'real' : 'ideal'}
                                    </button>
                                </p>
                            </div>

                            <button
                                onClick={handleAttack}
                                className="btn btn-warning w-full"
                            >
                                Generate Adversarial Example
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
