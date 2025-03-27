import asyncio
import subprocess
import json
from typing import Dict, Any, Optional

class TrivyScanner:
    @staticmethod
    async def run_trivy_scan(image_name: str) -> Dict[str, Any]:
        """
        Perform async Trivy scan on Docker image
        
        Args:
            image_name (str): Docker image to scan
        
        Returns:
            Dict[str, Any]: Parsed Trivy scan results
        """
        try:
            # Run Trivy scan asynchronously
            process = await asyncio.create_subprocess_shell(
                f"trivy image --format json --severity HIGH,CRITICAL,MEDIUM {image_name}",
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            stdout, stderr = await process.communicate()
            
            if process.returncode != 0:
                error_message = stderr.decode().strip()
                print(f"Trivy scan error: {error_message}")
                return {}
            
            return json.loads(stdout)
        
        except Exception as e:
            print(f"Trivy scan error: {e}")
            return {}
    
    @staticmethod
    def process_trivy_results(scan_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process and summarize Trivy scan results
        
        Args:
            scan_data (Dict[str, Any]): Raw Trivy scan results
        
        Returns:
            Dict[str, Any]: Processed vulnerability summary
        """
        summary = {
            'total_vulnerabilities': 0,
            'severity_counts': {
                'CRITICAL': 0,
                'HIGH': 0,
                'MEDIUM': 0,
                'LOW': 0
            },
            'vulnerable_packages': []
        }
        
        # Process results from all scanned layers/components
        for result in scan_data.get('Results', []):
            for vuln in result.get('Vulnerabilities', []):
                severity = vuln.get('Severity', 'UNKNOWN')
                
                # Count vulnerabilities
                if severity in summary['severity_counts']:
                    summary['severity_counts'][severity] += 1
                    summary['total_vulnerabilities'] += 1
                
                # Track vulnerable packages
                summary['vulnerable_packages'].append({
                    'package': vuln.get('PkgName', ''),
                    'vulnerability_id': vuln.get('VulnerabilityID', ''),
                    'severity': severity,
                    'installed_version': vuln.get('InstalledVersion', ''),
                    'fixed_version': vuln.get('FixedVersion', ''),
                    'title': vuln.get('Title', ''),
                    'description': vuln.get('Description', '')
                })
        
        return summary
    
    @staticmethod
    async def full_image_scan(image_name: str) -> Dict[str, Any]:
        """
        Comprehensive image scanning method
        
        Args:
            image_name (str): Docker image to scan
        
        Returns:
            Dict[str, Any]: Comprehensive scan results
        """
        try:
            # Run full Trivy scan
            scan_data = await TrivyScanner.run_trivy_scan(image_name)
            
            # Process scan results
            processed_results = TrivyScanner.process_trivy_results(scan_data)
            
            # Add raw scan data for potential detailed analysis
            processed_results['raw_scan_data'] = scan_data
            
            return processed_results
        
        except Exception as e:
            print(f"Full image scan error: {e}")
            return {
                'error': str(e),
                'total_vulnerabilities': 0,
                'severity_counts': {},
                'vulnerable_packages': []
            }